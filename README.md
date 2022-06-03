# peer

A wrapper around WebRTC that implements self-identification and multilpe connections between peers.

This contains two modules: `PeerConnection`, the low-level API that acts similarly to `peer-simple`, and `Peer`, a high-level substitute
that allows for peers to identify themselves between reconnects and connect to multiple peers.
## usage & implementation

<details>
  <summary>Low Level: Two Peers</summary>

  ```ts
  // psuedo sending api: send(key, value). on(key, value => void)

  { // peer 1
    const peer = await createPeerConnection("offerer")

    send("description", peer.description)

    on("description", description => {
      await peer.connect(description)
    })
  }

  { // peer 2
    const peer = await createPeerConnection("answerer")

    on("description", description => {
      const response = await peer.connect(description);
      send("description", response)
    })
  }

  {
    // any peer

    peer.on("connect", () => /* ... */)
    peer.on("disconnect", () => /* ... */)
  }
  ```
</details>

<details>
  <summary>Peer Connection handler</summary>

  ```ts
  const peer = createPeer()

  const connection = spawnConnection()
  ```
</details>

## what?

In order for WebRTC, a peer-to-peer communication library, to communicate with other peers, there are 3 servers that can be used.

### Stun
Stun servers are servers (usually free) that allow for peers to get their own IP. These are required.

### Signaling
In order for peers to connect to other peers, they need a signaling server that transmits this simply. These servers transmit large SDP offers

**This** is what this project aims to replace, as the data provided can be over a few kilobytes.
This compresses them to as small as possible to fit easily in a QR code.

This server isnt required, but popular webrtc libraries such as Peer.js use it.

### Turn
Turn servers are optional and act as fallback servers for communication. These are only
occasioally used.

## References

Based off of https://github.com/LeoDog896/p2signal