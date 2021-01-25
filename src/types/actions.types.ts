export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P extends object> {
  type: T;
  payload: P;
}
