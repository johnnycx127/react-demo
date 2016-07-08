import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from '../constants/info';

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: LOAD_SUCCESS,
    message: 'This came from the api server',
    time: Date.now()
  };
}
