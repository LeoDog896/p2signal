import { createPeerConnection, type PeerConnection } from "./connection/peerConnection"
import { type EventSystem, eventSystemFactory } from "./events/eventSystemFactory"

type Peer<T extends { [key: string]: unknown }> = {
  connections: PeerConnection[],
  createConnection: typeof createPeerConnection
} & EventSystem<{
  error: Error
} & T>

export function createPeer<T extends { [key: string]: unknown }>(): Peer<T> {

  const connections: PeerConnection[] = [];

  return {
    connections,
    createConnection: async (type, options) => {
      const connection = await createPeerConnection(type, options);
      connections.push(connection)
      return connection
    },
    ...eventSystemFactory<T>()
  }
}