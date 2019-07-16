import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, incrementAsyncCounter, decrementAsyncCounter } from '../../store/counter/actions';
import { AppState } from '../../store';

interface Props {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onIncrementAsync: () => void;
  onDecrementAsync: () => void;
}

const Counter: React.FC<Props> = ({ count, onDecrement, onIncrement, onDecrementAsync, onIncrementAsync }) => (
  <div>
    <button onClick={onDecrementAsync}>decrement async</button>
    <button onClick={onDecrement}>decrement</button>
    <div>{count}</div>
    <button onClick={onIncrementAsync}>increment async</button>
    <button onClick={onIncrement}>increment</button>
  </div>
);

const mapStateToProps = ({ counter }: AppState) => ({
  count: counter.count
});

const mapDispatchToProps = {
  onIncrement: incrementCounter,
  onDecrement: decrementCounter,
  onIncrementAsync: incrementAsyncCounter,
  onDecrementAsync: decrementAsyncCounter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
