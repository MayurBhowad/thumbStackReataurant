import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import orderReducer from './reducers/order.reducer';
import billReducer from './reducers/bill.reducer';


const initialState = {}

const middleware = [thunk]

const reducer = combineReducers({
    order: orderReducer,
    bill: billReducer
})

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;