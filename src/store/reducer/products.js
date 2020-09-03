const INITIAL_STATE = [];

const updateProducts = (state, product) => {
  return state.map(stateInfo => {
    if (stateInfo.id === product.id) {
      return { ...product };
    } else {
      return { ...stateInfo };
    }
  });
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.payload;
    case 'POST_PRODUCT':
      return [...state, action.payload];
    case 'DELETE_PRODUCT':
      return state.filter(stateInfo => !action.payload.includes(stateInfo.id));
    case 'PUT_PRODUCT':
      return updateProducts(state, action.payload);
    default:
      return state;
  }
}
