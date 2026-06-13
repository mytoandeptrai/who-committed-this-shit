import Cookies from 'js-cookie';

const COOKIES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

const setCookie = (key: string, value: string) => {
  Cookies.set(key, value);
};

const getCookie = (key: string) => {
  return Cookies.get(key);
};

const removeCookie = (key: string) => {
  Cookies.remove(key);
};

export { COOKIES, getCookie, removeCookie, setCookie };
