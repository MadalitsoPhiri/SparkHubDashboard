import { useHttp } from '@/hooks/useHttp';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { process_retry_event } from '@/utils/index';

import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { SocketResponse } from '@/types/socketResponse.type';
import { User } from '@/types/user.types';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export type RegisterPayload = {
  user_name: string;
  email: string;
  company_name: string;
  company_size: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export const useAuth = () => {
  const { get, post, destroy } = useHttp();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (data: LoginPayload) => {
    AuthStore.requestLogin();

    try {
      const response = await post('/api/auth/login', data, {
        withCredentials: true,
      });
      AuthStore.setUserAndSocket(response);
    } catch (e) {
      AuthStore.setLoginError(e);
      if (e instanceof AxiosError) {
        notify('error', e?.response?.data?.message);
      }
    }
  };

  const refreshSocketToken = (payload: any) => {
    if (
      AuthStore.socket === null ||
      AuthStore.socket._readyState === 'closed'
    ) {
      AuthStore.requestRefreshTokenSuccess(payload);
    } else {
      AuthStore.requestRefreshTokenSuccess(payload);
      AuthStore.socket.emit('refresh_token', {
        event_name: 'refresh_token',
        data: payload.data.user,
      });
    }
  };
  const refreshToken = async () => {
    AuthStore.requestRefreshToken(true);

    try {
      const response = await get('/api/auth/refresh_token/', {
        withCredentials: true,
      });

      refreshSocketToken(response);
      AuthStore.requestRefreshToken(false);
      return response;
    } catch (e) {
      AuthStore.requestRefreshToken(false);
    }
  };

  const retryEvents = (payload: any) => {
    payload.data.map((item: any) => {
      const parsedItem = JSON.parse(item);

      if (parsedItem.event_name !== null) {
        AuthStore.socket?.emit(
          parsedItem.event_name,
          parsedItem,
          (response: any) => {
            process_retry_event(
              parsedItem.event_name,
              response,
              parsedItem.data,
            );
          },
        );
      }
    });
  };

  const update_user_info_async = (update: any) => {
    AuthStore.set_updating_user_info(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_USER_INFO,
      { event_name: SOCKET_EVENT_NAMES.UPDATE_USER_INFO, data: update },
      (response: any) => {
        AuthStore.set_updating_user_info(false);

        if (response.data) {
          AuthStore.update_user_info(response.data);
        }
      },
    );
  };
  const register = async (data: RegisterPayload) => {
    AuthStore.setLoading(true);
    try {
      const response = await post<User>('/api/auth/signup', data);

      AuthStore.setUserAndSocket(response);
      navigate(
        location.state?.from?.pathname
          ? location.state?.from?.pathname
          : routeNames.dashboard.home,
        { replace: true },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        notify('error', error?.response?.data?.message);
      } else {
        notify('error', 'Something went wrong');
      }
      AuthStore.setLoginError(error);
    } finally {
      AuthStore.setLoading(false);
    }
  };

  const forgotPassword = (data: ForgotPasswordPayload) => {
    AuthStore.setLoading(true);
    post<User>('/api/auth/forgot-password', data)
      .then(() => {
        navigate(routeNames.authentication.resetPassword, {
          replace: true,
        });
      })
      .catch(error => {
        AuthStore.setLoginError(error?.response?.data?.message as never);
      })
      .finally(() => {
        AuthStore.setLoading(false);
      });
  };

  const resetPassword = (data: ResetPasswordPayload) => {
    AuthStore.setLoading(true);
    post<User>('/api/auth/reset-password', data)
      .then(() => {
        navigate(routeNames.authentication.login, {
          replace: true,
        });
      })
      .catch(error => {
        AuthStore.setLoginError(error?.response?.data?.message as never);
      })
      .finally(() => {
        AuthStore.setLoading(false);
      });
  };

  const logout = async () => {
    try {
      await destroy('/api/auth/logout');
      window.location.href = '/auth/login';
      AuthStore.setUserAndSocket(null);
    } catch (e) {
      AuthStore.setLoginError(e);
    }
  };

  const get_user_info = (id: string) => {
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.GET_USER_INFO,
      { event_name: SOCKET_EVENT_NAMES.GET_USER_INFO, data: { id } },
      (response: SocketResponse<any>) => {
        if (response.data) {
          AuthStore.update_user_info(response.data);
        }
      },
    );
  };

  return {
    login,
    logout,
    register,
    retryEvents,
    refreshToken,
    resetPassword,
    forgotPassword,
    refreshSocketToken,
    update_user_info_async,
    get_user_info,
  };
};
