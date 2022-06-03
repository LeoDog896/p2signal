import { eventSystemFactory, type EventSystem } from "../events/eventSystemFactory"
import { reduce, expand } from "../sdp/compressSDP"
import { peerConnectionAddEventListener } from "../events/waitForListener"

export type EventRecord = { [key: string]: unknown }
export type DefaultEventRecord = { [key: string]: never }

export type BaseEvents = {
  connect: RTCDataChannel;
  disconnect: void;
  error: Error;
}

export type PeerConnectionType = "offerer" | "answerer"

export type PeerConnection<T extends EventRecord = DefaultEventRecord> = {
  connection: RTCPeerConnection;
} & EventSystem<BaseEvents & T>

export type OffererPeerConnection<T extends EventRecord = DefaultEventRecord> = PeerConnection<T> & {
  type: Extract<PeerConnectionType, "offerer">,
  offer: RTCSessionDescriptionInit;
  description: string;
  datachannel: RTCDataChannel;
  /** Connects to the answer description. If you await the promise, it also waits for the on("connect") event. */
  connect: (description: string) => Promise<void>;
}

export type AnswererPeerConnection<T extends EventRecord = DefaultEventRecord> = PeerConnection<T> & {
  type: Extract<PeerConnectionType, "answerer">
  /** Connects to the offer description. Awaiting will not listen to the on("connect") event */
  connect: (description: string) => Promise<string>;
}

export interface PeerConnectionOptions {
  iceServers: RTCIceServer[] | string[];
}

/**
 * Wait for all ice candidates to be gathered.
 * @param connection The RTCPeerConnection.
 * @returns The local description of the peer.
 */
const waitForIceCandidates = (connection: RTCPeerConnection): Promise<string> => new Promise(resolve => {
  connection.addEventListener("icecandidate", ({ candidate }) => {
    if (candidate == null && connection.localDescription !== null) {
      resolve(reduce(connection.localDescription));
    }
  })
})

export async function createPeerConnection<E extends EventRecord = DefaultEventRecord, T extends PeerConnectionType = PeerConnectionType>(
  type: T,
  options?: Partial<PeerConnectionOptions>
): Promise<
  T extends "answerer" & "offerer" ? AnswererPeerConnection<E> | OffererPeerConnection<E>
    : T extends "answerer" ? AnswererPeerConnection<E> : OffererPeerConnection<E>
>

export async function createPeerConnection<E extends EventRecord = DefaultEventRecord>(
  type: PeerConnectionType,
  options?: Partial<PeerConnectionOptions>
): Promise<OffererPeerConnection<E> | AnswererPeerConnection<E>> {

  const iceServers = options?.iceServers?.map(server => typeof server == "string" ? { urls: server } : server) 
    ?? [{ urls: "stun:stun.l.google.com:19302" }];

  const connection = new RTCPeerConnection({
    iceServers
  });
  
  const eventSystem = eventSystemFactory<BaseEvents>()

  connection.addEventListener("connectionstatechange", () => {
    if (connection.connectionState === "disconnected") {
      eventSystem.trigger("disconnect")
    } else if (connection.connectionState === "failed") {
      eventSystem.trigger("error", new Error("Connection failed."))
    }
  })

  if (type == "offerer") {
    const datachannel = connection.createDataChannel("init")
    const offer = await connection.createOffer()
    await connection.setLocalDescription(offer);
    const description = await waitForIceCandidates(connection);

    datachannel.addEventListener("message", ({ data }) => {
      const { type, content } = JSON.parse(data)
      eventSystem.trigger(type, content)
    })
    const check = peerConnectionAddEventListener(connection, "connectionstatechange", () => connection.connectionState === "connected")

    return {
      type: "offerer",
      connection,
      offer,
      description,
      datachannel,
      async connect(description) {
        await connection.setRemoteDescription(expand(description));
        eventSystem.trigger("connect", datachannel)
        await check;
      },
      ...eventSystem
    }
  }

  connection.addEventListener("datachannel", ({ channel }) => {
    eventSystem.trigger("connect", channel)
    channel.addEventListener("message", ({ data }) => {
      const { type, content } = JSON.parse(data)
      eventSystem.trigger(type, content)
    })
  })

  return {
    type: "answerer",
    connection,
    async connect(description) {
      await connection.setRemoteDescription(expand(description))
      await connection.setLocalDescription(await connection.createAnswer())
      return await waitForIceCandidates(connection)
    },
    ...eventSystem
  }
}