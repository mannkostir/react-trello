export interface ActionWithPayload<T extends string, P extends object> {
  type: T;
  payload: P;
}

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
  payload: any;
}
