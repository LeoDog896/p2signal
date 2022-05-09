# p2signal

A library that compresses WebRTC signaling data into smaller codes.

## what?

In order for WebRTC, a peer-to-peer communication library, to communicate with other peers, there are 3 servers that can be used.

### Stun
Stun servers are servers (usually free) that allow for peers to get their own IP. These are required.

### Signaling
In order for peers to connect to other peers, they need a signaling server that transmits this simply. 

**This** is what this project aims to replace, as the data provided can be over a few kilobytes.
This compresses them to as small as possible to fit easily in a QR code.

This server isnt required, but popular webrtc libraries such as Peer.js use it.

### Turn
Turn servers are optional and act as fallback servers for communication. These are only
occasioally used.

## why?

The ultimate goal of this project (and further research) is to make serverless networking on the web.

Based off of https://github.com/lesmana/webrtc-without-signaling-server

## demo

This demo uses the library to create a simple 2 person direct chat room.
It's limited to this as anything further is the goal of other p2p libs.