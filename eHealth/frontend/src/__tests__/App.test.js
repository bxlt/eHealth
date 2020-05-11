import React from 'react';
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render, fireEvent, getByTestId } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from '../views/App';

it("Renders Correctly", ()=> {
  const history = createMemoryHistory()
  const { asFragment, container, getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(asFragment()).toMatchSnapshot()
  expect(getByTestId('header')).toBeEnabled()
  expect(getByTestId('container')).toBeEnabled()
  expect(container.innerHTML).toMatch('Welcome!')
});

it("Select Menu Test", ()=> {
  let mySidenav
  let style;
  const history = createMemoryHistory()
  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  fireEvent.click(getByTestId('headerMenu'))
  fireEvent.click(getByTestId('headerMenu'))
  mySidenav = getByTestId('mySidenav')
  style = window.getComputedStyle(mySidenav)
  expect(style.width).toBe('250px')

  fireEvent.click(getByTestId('exitButton'))
  style = window.getComputedStyle(mySidenav)
  expect(style.width).toBe('0px')
})

// it('landing on a bad page shows 404 page', () => {
//   const history = createMemoryHistory()
//   history.push('/some/bad/route')
//   const { getByRole } = render(
//     <Router history={history}>
//       <App />
//     </Router>
//   )
//   expect(getByRole('heading')).toHaveTextContent('404 Not Found')
// })
