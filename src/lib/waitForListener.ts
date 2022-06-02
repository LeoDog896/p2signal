export function onceAddEventListener<
  K extends { [key: string]: Event },
  E extends keyof K
>(obj: EventTarget, type: E, options?: AddEventListenerOptions): Promise<K[E]> {
  return new Promise((resolve) => {
    obj.addEventListener(type.toString(), e => resolve(e as K[E]), { ...options, once: true });
  })
}

export async function oncePeerConnectionAddEventListener<
  E extends keyof RTCPeerConnectionEventMap
>(obj: RTCPeerConnection, type: E, options?: AddEventListenerOptions): Promise<RTCPeerConnectionEventMap[E]> {
  return onceAddEventListener<RTCPeerConnectionEventMap & { [key: string]: Event }, E>(obj, type, options);
}


export function addEventListener<
  K extends { [key: string]: Event },
  E extends keyof K
>(obj: EventTarget, type: E, predicate: (value: K[E]) => boolean, options?: AddEventListenerOptions): Promise<K[E]> {
  return new Promise((resolve) => {
    const f = (e: Event) => {
      console.log(e)
      if (predicate(e as K[E])) {
        resolve(e as K[E]);
        obj.removeEventListener(type.toString(), f)
      }
    }
    obj.addEventListener(type.toString(), f, { ...options, once: true });
  })
}

export async function peerConnectionAddEventListener<
  E extends keyof RTCPeerConnectionEventMap
>(obj: RTCPeerConnection, type: E, predicate: (value: RTCPeerConnectionEventMap[E]) => boolean, options?: AddEventListenerOptions): Promise<RTCPeerConnectionEventMap[E]> {
  return addEventListener<RTCPeerConnectionEventMap & { [key: string]: Event }, E>(obj, type, predicate, options);
}