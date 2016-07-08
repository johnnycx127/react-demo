import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../constants/auth';

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: LOAD_SUCCESS,
    user: { name: 'zhuxiaofeng' }
  };
}

export function login(name) {
  return {
    types: LOGIN_SUCCESS,
    user: { name: 'zhuxiaofeng' }
  };
}

export function logout() {
  return {
    types: LOGOUT_SUCCESS,
  };
}
