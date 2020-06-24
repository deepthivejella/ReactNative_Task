const initialState = {
  Starter: [
    {
      id: 1,
      name: 'Chilli Chicken',
      taste:'indian',
      price: 250
    },
    {
      id: 2,
      name: 'Mexican Chicken',
      taste:'north indian',
      price: 350
    }
  ],
  MainCourse: [
    {
      id: 101,
      name: 'Chiken Biryani',
      taste:'hydbadi',
      price: 219
    },
    {
      id: 102,
      name: 'Mutton Biryani',
      taste:'hydbadi',
      price: 289
    }
  ],
  Dessert: [
    {
      id: 201,
      name: 'lassi and ice cream',
      taste:'punjabi',
      price: 120
    },
    {
      id: 202,
      name: 'Cheese Cake',
      taste:'indian',
      price: 80
    }
  ],
  Drinks: [
    {
      id: 301,
      name: 'lime juice',
      taste:'south indian',
      price: 35
    },
    {
      id: 302,
      name: 'coke',
      taste:'indian',
      price: 35
    }
  ]
};

const menuReducer = (state = initialState, { type, payload }) => {
  return state;
};

export default menuReducer;