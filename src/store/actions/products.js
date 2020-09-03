import api from '../../services/api';

export const getProducts = () => {
  return dispatch => {
    api.get('/products').then(res => {
      dispatch({ type: 'GET_PRODUCTS', payload: res.data });
    });
  };
};

export const postProduct = product => {
  return dispatch => {
    api.post('/products', product).then(res => {
      dispatch({ type: 'POST_PRODUCT', payload: res.data });
    });
  };
};

export const putProduct = product => {
  return dispatch => {
    api.put(`/products/${product.id}`, product).then(res => {
      dispatch({ type: 'PUT_PRODUCT', payload: res.data });
    });
  };
};

export const deleteProduct = ids => {
  return dispatch => {
    ids.forEach(id => {
      if (id) {
        api.delete(`/products/${id}`);

        dispatch({ type: 'DELETE_PRODUCT', payload: ids });
      }
    });
  };
};
