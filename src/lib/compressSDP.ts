const beginSDP = `v=0\r\n`

function reduceSDP(sdp: string): string {
  return sdp.split("\r\n").map(it => {
    if (it == "v=0") return ""

    if (it.includes("a=fingerprint")) {
      const result = it.match(/(?<=fingerprint:sha-256 )([0-Z:]+)/g)
      if (!result) return
      return `a=f${result[0].replaceAll(":", "")}`
    }
    
    return it
  }).filter(it => it).join("")
}

function expandSDP(sdp: string): string {
  return beginSDP + sdp.split(/(?=\w=)/g).map(it => {
    if (it.match(/a=f[0-Z]/)) {
      const result = it.match(/(?<=f)([0-Z:]+)/g)
      if (!result) throw Error("Could not find fingerprint")

      const splitSTR = result[0].matchAll(/[0-9A-Z]{2}/g)

      return `a=fingerprint:sha-256 ${[...splitSTR].join(":")}`
    }
    return it
  }).join("\r\n") + "\r\n"
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