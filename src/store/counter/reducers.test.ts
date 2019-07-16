import counterReducer from './reducers';
import { decrementCounter, incrementCounter } from './actions';


describe('counter reducers', (): void => {

  it('increment action should increase count by one', (): void => {
    const initialState = { count: 0 };
    const action = incrementCounter();
    const mutatedState = counterReducer(initialState, action);

    expect(mutatedState.count).toBe(initialState.count + 1);
  });

  it('decrement action should decrease count by one', (): void => {
    const initialState = { count: 0 };
    const action = decrementCounter();
    const mutatedState = counterReducer(initialState, action);

    expect(mutatedState.count).toBe(initialState.count - 1);
  });

});
