import { BASE_URL } from '@/constants/index';
import axios from 'axios';
export const useHttp = () => {
  const getClient = async (options?: any) => {
    const headers: HeadersInit = options?.notJSON
      ? {}
      : {
          'Content-Type': 'application/json',
        };

    const client = axios.create({
      baseURL: BASE_URL,
      timeout: options?.timeout || 30000,
      headers: headers,
    });
    return client;
  };

  const setDefaults = (options: any) => {
    if (!options) {
      options = { withCredentials: true };
    }

    // eslint-disable-next-line no-prototype-builtins
    if (!options.hasOwnProperty('errorMessage')) {
      // default to generic api error
      options.errorMessage = 'A server error has occurred.  Please try again.';
    }

    return options;
  };

  const handleHttpError = (errorObject: any, data: any, options: any) => {
    if (options?.dieSilent) return;
    if (
      errorObject.response?.status === 400 ||
      errorObject.response?.status === 401 ||
      errorObject.response?.status === 404
    ) {
      let errorMessage = errorObject.response?.data?.httpMessage;
      try {
        const message = JSON.parse(errorMessage);
        if (message.message) errorMessage = message.message;
      } catch (e) {
        //...
      }
    }

    return options?.dieSilent
      ? ''
      : errorObject?.response?.data?.httpMessage || options.errorMessage;
  };
  const get = async <T = any>(url: string, _options?: any): Promise<T> => {
    const options = setDefaults(_options);
    try {
      const client = await getClient(options);
      const response = await client.get(url, { withCredentials: true });
      const data = await response.data;
      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const put = async <T = any>(
    url: string,
    requestData: Record<string, any>,
    _options?: any,
  ): Promise<T> => {
    const options = setDefaults(_options);
    try {
      const client = await getClient(options);
      const response = await client.put(url, requestData, {
        withCredentials: true,
      });
      const data = await response.data;
      return data;
    } catch (e: any) {
      const data = {
        source: 'useHttp.put',
        url: `${BASE_URL}${url}`,
        requestData,
      };
      if (options.handleError) {
        return {
          error: true,
          message: e?.response?.data?.httpMessage ?? options.errorMessage,
        } as any;
      } else {
        const backendError = handleHttpError(e, data, options);
        return Promise.reject(backendError);
      }
    }
  };

  const post = async <T = any>(
    url: string,
    requestData: Record<string, any>,
    _options?: any,
  ): Promise<T> => {
    const options = setDefaults(_options);

    try {
      const client = await getClient(options);
      const response = await client.post(`${url}`, requestData, {
        withCredentials: true,
      });

      const data = await response.data;
      return data;
    } catch (e) {
      const data = {
        source: 'useHttp.post',
        url: `${BASE_URL}${url}`,
        requestData,
      };
      handleHttpError(e, data, options);

      return Promise.reject(e);
    }
  };

  const destroy = async <T = any>(url: string, _options?: any): Promise<T> => {
    const options = setDefaults(_options);

    try {
      const client = await getClient(options);
      const response = await client.delete(url, {
        withCredentials: true,
      });

      const data = await response.data;
      return data;
    } catch (e) {
      const data = {
        source: 'useHttp.post',
        url: `${BASE_URL}${url}`,
      };
      handleHttpError(e, data, options);

      return Promise.reject(e);
    }
  };
  return { get, put, post, destroy };
};
