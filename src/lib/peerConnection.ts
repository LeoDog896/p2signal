type PeerConnectionType = "offerer" | "answerer"

type PeerConnection = {
  connection: RTCPeerConnection;
  connect: (description: RTCSessionDescription) => Promise<void>
} & ({
  type: Extract<PeerConnectionType, "offerer">,
  offer: RTCSessionDescriptionInit;
  description: RTCSessionDescription;
} | {
  type: Extract<PeerConnectionType, "answerer">
})

interface PeerConnectionOptions {
  iceServers: RTCIceServer[] | string[];
}

/**
 * Wait for all ice candidates to be gathered.
 * @param connection The RTCPeerConnection.
 * @returns The local description of the peer.
 */
const waitForIceCandidates = (connection: RTCPeerConnection): Promise<RTCSessionDescription> => new Promise(resolve => {
  connection.addEventListener("icecandidate", ({ candidate }) => {
    if (candidate == null && connection.localDescription !== null) {
      resolve(connection.localDescription);
    }
  })
})

export const createPeerConnection = async (type: PeerConnectionType, options: Partial<PeerConnectionOptions>): Promise<PeerConnection> => {

  const iceServers = options.iceServers?.map(server => typeof server == "string" ? { urls: server } : server) 
    ?? [{ urls: "stun:stun.l.google.com:19302" }];

  const connection = new RTCPeerConnection({
    iceServers
  });

  if (type == "offerer") {
    const offer = await connection.createOffer()
    await connection.setLocalDescription(offer);
    const description = await waitForIceCandidates(connection);

    return {
      type: "offerer",
      connection,
      offer,
      description,
      connect: async (description) => void 0
    }
  }

  return {
    type: "answerer",
    connection,
    connect: async (description) => void 0
  }
}