import { Cookies } from 'react-cookie';
import { setAuth } from '../actions/headersAction';
import { setTokens } from '../actions/loginAction';
import env from '../enviroment/environment';
import { store } from '../store/store';

const cookies = new Cookies();

const minutesToAdd= 1440;

export const getCookieAuth = () => {
  return cookies.get(env.campusvirtual_token) || null;
}

export const getCookieRefresh = () => {
  try {
    return cookies.get(env.campusvirtual_refresh)
  } catch(e) {
    return null;
  }
}

export const setCookieAuthAndRefresh = (auth,refresh) => {
  const currentDate = new Date();
  const expires = new Date(currentDate.getTime() + minutesToAdd*60000);
  cookies.set(env.campusvirtual_token,JSON.stringify(auth),{
    expires
  })
  cookies.set(env.campusvirtual_refresh,JSON.stringify(refresh),{
    expires
  });
}

export const setCookieAuth = (auth) => {
  const currentDate = new Date();
  const expires = new Date(currentDate.getTime() + minutesToAdd*60000);
  cookies.set(env.campusvirtual_token,JSON.stringify(auth),{
    expires
  })
  store.dispatch(setAuth(`Bearer ${auth}`));
  store.dispatch(setTokens(auth));
}

export const clearCookiesAuth = () => {
  cookies.remove(env.campusvirtual_token);
  cookies.remove(env.campusvirtual_refresh);
}


