const removeCartItem = (id, cartItems) => {
    let newCartItems = [];
    const getSimilarDishes = cartItems.filter(item => item.id === id)
    const getDissimilarDishes = cartItems.filter(item => item.id !== id);
  
    if (getSimilarDishes.length !== 0) {
      getSimilarDishes.pop();
      newCartItems = [...getSimilarDishes, ...getDissimilarDishes]
      return newCartItems;
    }
  
    newCartItems = [...getDissimilarDishes]
    return newCartItems;
  }
  
  const getSimilarDishesLength = (id, cartItems) => cartItems.filter((item) => item.id === id).length;
  
  export default {
    removeCartItem, 
    getSimilarDishesLength
  }