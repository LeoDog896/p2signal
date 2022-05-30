interface PeerConnection {
  connection: RTCPeerConnection;
  offer: RTCSessionDescriptionInit;
  description: RTCSessionDescription;
}

interface PeerOptions {
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

export const createPeerConnection = async (options: Partial<PeerOptions>): Promise<PeerConnection> => {

  const iceServers = options.iceServers?.map(server => typeof server == "string" ? { urls: server } : server) 
    ?? [{ urls: "stun:stun.l.google.com:19302" }];

  const connection = new RTCPeerConnection({
    iceServers
  });

  const offer = await connection.createOffer()

  const description = await waitForIceCandidates(connection);

  return {
    connection,
    offer,
    description
  }
}