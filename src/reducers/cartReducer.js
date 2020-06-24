import types from '../types';

const initialState = {
  cart: []
};

const cartReducer = (state = initialState, { type, payload }) => {

  switch(type){
    case types.ADD_ITEM: 
      return {
        ...state,
        cart: [...state.cart, payload]
      }

    case types.SET_DATA:
      return {
        ...state,
        cart: payload
      }

    default: 
      return state;
  }
};

export default cartReducer;