import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage
}

// Define redux middleware & apply
const logger = createLogger({})
const middleware = applyMiddleware(thunk, logger)

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, middleware)

export const persistor = persistStore(store)

// Uncomment this if you want to purge your store on next refresh
persistor.purge()
