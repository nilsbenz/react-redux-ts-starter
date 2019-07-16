import { Reducer, AnyAction } from 'redux';

interface Handler<S> { [k: string]: HandlerFunction<S> }
type HandlerFunction<S> = (s: S, a: AnyAction) => S

export function createReducer<S, A extends AnyAction>(initialState: S, handlers: Handler<S>): Reducer<S, A> {
  return (state = initialState, action): S => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
