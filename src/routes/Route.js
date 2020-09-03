import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  isPrivate = false,
  component: Component,
  user,
  ...rest
}) => {
  const [token] = useState(() => {
    const localStorageToken = localStorage.getItem('@token');

    return localStorageToken;
  });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isPrivate === !!user.token || isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(PrivateRoute);
