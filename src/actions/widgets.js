import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  EDIT_START,
  EDIT_STOP,
  SAVE,
  SAVE_SUCCESS,
  SAVE_FAIL
} from '../constants/widgets';

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  return {
    types: LOAD_SUCCESS,
    widget: {}
  };
}

export function save(widget) {
  return {
    types: SAVE_SUCCESS,
    id: widget.id,
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
