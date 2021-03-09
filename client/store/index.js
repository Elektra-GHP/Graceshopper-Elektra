import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import plantsReducer from '../store/allPlantsReducer'
import plantReducer from '../store/singlePlantReducer'
import cartReducer from './cartReducer'
import typesReducer from './typesReducer'
import userHomeReducer from './user-homeReducer'

const reducer = combineReducers({
  user,
  plants: plantsReducer,
  plant: plantReducer,
  cart: cartReducer,
  types: typesReducer,
  userAccount: userHomeReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
