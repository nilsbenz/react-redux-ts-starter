import rootSagas from './sagas';
import { fork } from 'redux-saga/effects';
import counterSaga from './counter/sagas';

it('rootSaga contains all subSagas', (): void => {
  const generator = rootSagas();

  expect(generator.next().value).toEqual(fork(counterSaga));
  expect(generator.next()).toEqual({ done: true, value: undefined });
});

