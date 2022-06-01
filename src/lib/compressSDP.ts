function reduceSDP(sdp: string): string {
  return sdp.replaceAll("\r\n", "|")
}

function expandSDP(sdp: string): string {
  return sdp.replaceAll("|", "\r\n")
}

/* eslint-disable no-case-declarations */
export function reduce(desc: RTCSessionDescription) {
  const type = desc.type == "answer" ? "A" : "O"

  return type + reduceSDP(desc.sdp)
}

export function expand(str: string): RTCSessionDescriptionInit {
  return {
    type: str.charAt(0) == "A" ? "answer" : "offer",
    sdp: expandSDP(str.substring(1))
  }
}