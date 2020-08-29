import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import routeReducer from './routeReducer';

export default combineReducers({
  order: orderReducer,
  route: routeReducer
});