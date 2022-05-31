type OptionalIfUndefined<T> = (T extends undefined ? [] : never) | [T];

export interface EventSystem<
  K extends { [key: string]: unknown }
> {
  on<E extends keyof K>(key: E, callback: (...[event]: OptionalIfUndefined<K[E]>) => void): void;
  trigger<E extends keyof K>(key: E, ...[value]: OptionalIfUndefined<K[E]>): void;
}

export function eventSystemFactory<
  K extends { [key: string]: unknown } 
>(): EventSystem<K> {

  const listeners: { 
    [key in keyof K]?: (...[event]: OptionalIfUndefined<K[key]>) => void 
  } = {};

  return {
    on: (key, callback) => listeners[key] = callback,
    trigger: (key, ...value) => listeners[key]?.(...value)
  }
}