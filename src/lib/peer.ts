import { createPeerConnection, type PeerConnection } from "./connection/peerConnection"

interface Peer {
  connections: PeerConnection[],
  createConnection: typeof createPeerConnection
}

export function createPeer(): Peer {
  return {
    connections: [],
    createConnection: (type, options) => {
      return createPeerConnection(type, options)
    }
  }
}