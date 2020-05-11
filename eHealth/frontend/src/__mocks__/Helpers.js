import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import reducer from '../redux/reducers'

const middleware = applyMiddleware(thunk)

// This is a helper function for testing case invove redux
// Source: https://testing-library.com/docs/example-react-redux
export function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, middleware) } = {}
  ) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}
