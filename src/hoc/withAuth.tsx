import { NextComponentType } from 'next';
import React from 'react';
import Login from '../components/auth/Login';
import Unauthorized from '../components/auth/Unauthorized';
import { UserContext } from '../pages/_app';
import { AccessLevel } from '../types/enum/accessLevel';

function withAuth<T>(
  Component: NextComponentType<T>,
  accessLevel: AccessLevel = AccessLevel.ADMIN
) {
  const Auth = (props: T) => {
    // Login data added to props via redux-store (or use react context for example)
    const { user } = React.useContext(UserContext);

    // If user is not logged in, return login component
    if (!user) return <Login />;

    // User is logged in but does not have required access level.
    if (
      accessLevel === AccessLevel.ADMIN &&
      user.accessLevel !== AccessLevel.ADMIN
    )
      return <Unauthorized requiredAccessLevel={accessLevel} />;

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
