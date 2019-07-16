import {
  CounterState, INCREMENT_COUNTER, DECREMENT_COUNTER, CounterActionTypes, INCREMENT_BY_COUNTER
} from './types';
import { createReducer } from '../utility/reducer';

const initialState: CounterState = {
  count: 1
};

const counterReducer = createReducer<CounterState, CounterActionTypes>(initialState, {
  [INCREMENT_COUNTER]: (state): CounterState => ({ count: state.count + 1 }),
  [DECREMENT_COUNTER]: (state): CounterState => ({ count: state.count - 1 }),
  [INCREMENT_BY_COUNTER]: (state, action): CounterState => ({ count: state.count + action.payload.by })
});

export default counterReducer;
