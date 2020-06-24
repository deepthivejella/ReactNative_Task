// import types from '../types'

// const addItemToCart = (data) => ({
//     type: types.ADD_ITEM,
//     payload: data
//   });

// export default {
//   addItemToCart
// }

import types from '../types'

const addItemToCart = (data) => ({
    type: types.ADD_ITEM,
    payload: data
  });

  const setCartData = (data) => ({
    type: types.SET_DATA,
    payload: data
  });

export default {
  addItemToCart,
  setCartData
}