import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  menuReducer,
  cartReducer
})