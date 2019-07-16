import { fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import counterSaga from './counter/sagas';


export default function* rootSagas(): SagaIterator {
  yield fork(counterSaga);
}
