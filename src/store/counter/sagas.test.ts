import { put, delay, takeEvery } from 'redux-saga/effects';
import { decrementCounter, incrementCounter } from './actions';
import counterSaga, { decrementAsync, incrementAsync } from './sagas';
import { INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC } from './types';

describe('counter sagas', (): void => {

  it('incrementAsync', (): void => {
    const generator = incrementAsync();

    expect(generator.next().value).toEqual(delay(1000));
    expect(generator.next().value).toEqual(put(incrementCounter()));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('decrementAsync', (): void => {
    const generator = decrementAsync();

    expect(generator.next().value).toEqual(delay(1000));
    expect(generator.next().value).toEqual(put(decrementCounter()));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('counterSaga', (): void => {
    const generator = counterSaga();

    expect(generator.next().value).toEqual(takeEvery(INCREMENT_COUNTER_ASYNC, incrementAsync));
    expect(generator.next().value).toEqual(takeEvery(DECREMENT_COUNTER_ASYNC, decrementAsync));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });


});
