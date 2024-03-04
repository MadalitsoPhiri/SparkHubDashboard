export const ACCESS_TOKEN_KEY = '@tokenkey';
export const REFRESH_TOKEN_KEY = '@token';

export const setItem = (key: string, value: string) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const isLoggedIn = (key: string) => {
  return localStorage.getItem(key);
};

export const getItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || 'null');
};

export const removeIsLoggedIn = (key: string) => {
  localStorage.removeItem(key);
};

export const removeToken = (keys = []) => {
  return keys.forEach(key => localStorage.removeItem(key));
};
