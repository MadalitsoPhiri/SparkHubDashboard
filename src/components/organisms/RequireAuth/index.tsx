import routeNames from '@/routes/routeNames';
import { FC, ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Spinner from '@/components/atoms/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { AuthStore } from '@/state/AuthenticationStore';
import { observer } from 'mobx-react-lite';

type RequireAuthProps = {
  checkEmailVerification?: boolean;
  children: ReactElement;
};

const RequireAuth: FC<RequireAuthProps> = ({
  children,
  checkEmailVerification,
}) => {
  const location = useLocation();
  const { refreshToken } = useAuth();

  useEffect(() => {
    refreshToken();
  }, []);

  if (AuthStore.isLoading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Spinner size={40} color='#033EB5' />
      </div>
    );
  }

  if (!AuthStore.isLoading && !AuthStore.currentUser) {
    return (
      <Navigate
        to={routeNames.authentication.login}
        state={{ from: location, search: location.search }}
        replace
      />
    );
  }
  if (AuthStore.currentUser && checkEmailVerification) {
    if (!AuthStore.currentUser.verified) {
      return (
        <Navigate
          to={`/${routeNames.emailVerification.verificationPage}`}
          replace
        />
      );
    }
  }
  if (AuthStore.currentUser) {
    if (AuthStore.user_workspace_info.workspaces) {
      if (AuthStore.user_workspace_info.workspaces.length < 1) {
        // no workspaces for this user
        const to = routeNames.workspaces.add;
        if (to !== location.pathname) {
          return (
            <Navigate
              to={to}
              state={{ from: location, search: location.search }}
              replace
            />
          );
        }
      }
    } else {
      const to = routeNames.workspaces.add;
      if (to !== location.pathname) {
        return (
          <Navigate
            to={to}
            state={{ from: location, search: location.search }}
            replace
          />
        );
      }
    }
  }

  return children;
};

export default observer(RequireAuth);
