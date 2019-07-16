import { takeEvery, put, delay } from 'redux-saga/effects';
import { incrementCounter, decrementCounter } from './actions';
import { INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC } from './types';
import { SagaIterator } from '@redux-saga/core';

export function* incrementAsync(): SagaIterator {
  yield delay(1000);
  yield put(incrementCounter());
}

export function* decrementAsync(): SagaIterator {
  yield delay(1000);
  yield put(decrementCounter());
}

export function* counterSaga(): SagaIterator {
  yield takeEvery(INCREMENT_COUNTER_ASYNC, incrementAsync);
  yield takeEvery(DECREMENT_COUNTER_ASYNC, decrementAsync);
}

export default counterSaga;
