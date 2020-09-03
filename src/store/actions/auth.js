import api from '../../services/api';

export const getAuthUser = ({ userEmail, userPassword }) => {
  return dispatch => {
    return api.get('/auth').then(res => {
      const { email, password, token } = res.data;

      if (email === userEmail && password === userPassword) {
        localStorage.setItem('@token', token);

        dispatch({ type: 'ASYNC_GET_AUTH', payload: { user: res.data } });
      }
    });
  };
};
