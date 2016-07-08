import {
  IS_VALID,
  IS_VALID_SUCCESS,
  IS_VALID_FAIL
} from '../constants/survey';

export function isValidEmail(data) {
  return {
    types: IS_VALID_SUCCESS
  };
}
