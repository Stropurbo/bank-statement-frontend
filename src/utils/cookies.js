import Cookies from 'js-cookie';

export const setCookie = (name, value, days = 7) => {
  Cookies.set(name, value, { 
    expires: days, 
    sameSite: 'None', 
    secure: true 
  });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};

export const checkCookiesEnabled = () => {
  try {
    Cookies.set('test', 'test');
    const enabled = Cookies.get('test') === 'test';
    Cookies.remove('test');
    return enabled;
  } catch {
    return false;
  }
};
