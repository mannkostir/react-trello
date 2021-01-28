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

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P extends object>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P extends object>(
  type: T,
  payload?: P
) {
  return { type, ...(payload ? { payload } : {}) };
}
