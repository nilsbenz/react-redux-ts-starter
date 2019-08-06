import { CounterActionTypes, INCREMENT_COUNTER, DECREMENT_COUNTER, INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC, INCREMENT_BY_COUNTER } from './types';

export function incrementCounter(): CounterActionTypes {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrementCounter(): CounterActionTypes {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementAsyncCounter(): CounterActionTypes {
  return {
    type: INCREMENT_COUNTER_ASYNC
  };
}

export function decrementAsyncCounter(): CounterActionTypes {
  return {
    type: DECREMENT_COUNTER_ASYNC
  };
}

export function incrementCounterBy(by: number): CounterActionTypes {
  return {
    type: INCREMENT_BY_COUNTER,
    payload: { by }
  };
}
