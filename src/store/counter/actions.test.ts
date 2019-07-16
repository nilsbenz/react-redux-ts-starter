import { decrementAsyncCounter, decrementCounter, incrementAsyncCounter, incrementCounter } from './actions';
import { DECREMENT_COUNTER, DECREMENT_COUNTER_ASYNC, INCREMENT_COUNTER, INCREMENT_COUNTER_ASYNC } from './types';


describe('counter actions', (): void => {

  it('increment', (): void => {
    const action = incrementCounter();

    expect(action.type).toBe(INCREMENT_COUNTER);
  });

  it('decrement', (): void => {
    const action = decrementCounter();

    expect(action.type).toBe(DECREMENT_COUNTER);
  });

  it('increment async', (): void => {
    const action = incrementAsyncCounter();

    expect(action.type).toBe(INCREMENT_COUNTER_ASYNC);
  });

  it('decrement async', (): void => {
    const action = decrementAsyncCounter();

    expect(action.type).toBe(DECREMENT_COUNTER_ASYNC);
  });

});
