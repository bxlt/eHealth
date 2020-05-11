import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import App from '../views/App'
import { renderWithRedux } from '../__mocks__/Helpers'

it ("Clinician Main Page", ()=> {
  const history = createMemoryHistory()
  history.push('/clinician')
  const { asFragment, container, getByTestId, getAllByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId('header')).toBeEnabled()
  expect(getByTestId('container')).toBeEnabled()
  expect(container.innerHTML).toMatch('Welcome back,');
  expect(getAllByTestId('MenuCard')).toHaveLength(2)
})

describe ("Clinician Pending Page", ()=> {
  const history = createMemoryHistory()
  history.push('/clinician/pending')
  test ("Component Test", ()=> {
  const { asFragment, container, getByTestId } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  )
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('header')).toBeEnabled()
    expect(getByTestId('container')).toBeEnabled()
    expect(getByTestId('patientListingScreen')).toBeEnabled()
    expect(getByTestId('patientSearch')).toBeEnabled()
    expect(container.innerHTML).toMatch('Pending Forms for Transcription');
  })
})

describe ("Clinician Completed Forms Page", ()=> {
  const history = createMemoryHistory()
  history.push('/clinician/completed_forms')
  it ("Component Test", ()=> {
  const { asFragment, container, getByTestId } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  )
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId('header')).toBeEnabled()
    expect(getByTestId('container')).toBeEnabled()
    expect(getByTestId('patientListingScreen')).toBeEnabled()
    expect(getByTestId('patientSearch')).toBeEnabled()
    expect(container.innerHTML).toMatch('Completed Forms');
  })
})