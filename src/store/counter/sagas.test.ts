import { put, delay } from 'redux-saga/effects';
import { decrementCounter, incrementCounter } from './actions';
import { decrementAsync, incrementAsync } from './sagas';

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


});
