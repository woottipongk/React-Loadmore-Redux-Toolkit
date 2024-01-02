import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import cartReducer from './Reducer';

const rootReducer = combineReducers({
    cartReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };