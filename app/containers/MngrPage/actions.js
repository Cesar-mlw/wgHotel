/*
 *
 * MngrPage actions
 *
 */

import { 
  GET_RADIO_DATA, 
  GET_RADIO_DATA_ERROR, 
  GET_RADIO_DATA_SUCCESS 
} from './constants';

export function getRadioData(selectedValue) {
  return {
    type: GET_RADIO_DATA,
    selectedValue
  };
}
export function getRadioDataSuccess(events) {
  return {
    type: GET_RADIO_DATA_SUCCESS,
    events
  };
}
export function getRadioDataError(error) {
  return {
    type: GET_RADIO_DATA_ERROR,
    error
  };
}
