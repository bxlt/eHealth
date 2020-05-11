import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/main.scss'
import App from './views/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { positions, Provider as ReactAlertProvider } from 'react-alert'
import AlertTemplate from './components/common/AlertTemplate'

// Redux
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const alertOptions = {
  timeout: 5000,
  position: positions.TOP_CENTER
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ReactAlertProvider template={AlertTemplate} {...alertOptions}>
          <App />
        </ReactAlertProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
