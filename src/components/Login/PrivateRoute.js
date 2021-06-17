import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';
const PrivateRoute = ({ children, ...rest }) => {
  const [store, setStore] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.userInfo.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
