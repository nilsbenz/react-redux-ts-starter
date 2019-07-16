import { Action } from 'redux';

export interface CounterState {
  count: number;
}

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INCREMENT_COUNTER_ASYNC = 'INCREMENT_COUNTER_ASYNC';
export const DECREMENT_COUNTER_ASYNC = 'DECREMENT_COUNTER_ASYNC';
export const INCREMENT_BY_COUNTER = 'INCREMENT_BY_COUNTER';

type IncrementCounterAction = Action<typeof INCREMENT_COUNTER>
type DecrementCounterAction = Action<typeof DECREMENT_COUNTER>
type IncrementCounterAsyncAction = Action<typeof INCREMENT_COUNTER_ASYNC>
type DecrementCounterAsyncAction = Action<typeof DECREMENT_COUNTER_ASYNC>

interface IncrementByCounterAction extends Action<typeof INCREMENT_BY_COUNTER> {
  payload: {
    by: number;
  };
}

export type CounterActionTypes = IncrementByCounterAction | IncrementCounterAction | DecrementCounterAction | IncrementCounterAsyncAction | DecrementCounterAsyncAction;
