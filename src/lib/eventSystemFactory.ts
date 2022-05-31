export interface EventSystem<
  K extends Record<string, unknown>
> {
  on<E extends string>(key: E, callback: (event: K[E]) => void): void;
  trigger<E extends string>(key: E, value: K[E]): void;
}

type BaseEvents = {
  connect: void,
  disconnect: void,
  error: Error
}

export function eventSystemFactory<
  K extends Record<string, unknown> = BaseEvents
>(): EventSystem<K> {

  const listeners: { [key in keyof K]?: (event: K[key]) => void } = {};

  return {
    on: (key, callback) => listeners[key] = callback,
    trigger: (key, value) => listeners[key]?.(value)
  }
}