/*
 *
 * MngrPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_RADIO_DATA,
  GET_RADIO_DATA_SUCCESS,
  GET_RADIO_DATA_ERROR
} from './constants';

export const initialState = fromJS({
  data: [
    { id: 0, tipo: "Milan", vago: true },
    { id: 1, tipo: "Milan", vago: false },
    { id: 2, tipo: "Dubai", vago: true },
    { id: 3, tipo: "Dubai", vago: false },
    { id: 4, tipo: "New York", vago: true },
    { id: 5, tipo: "New York", vago: false },
  ],
  loading: false,
  error: true,
});

function mngrPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RADIO_DATA:
      return state.set('loading', true).set('error', false);
    case GET_RADIO_DATA_SUCCESS:
      return state.set('loading', false).set('error', false).set('data', [
        { id: 0, tipo: "Milan", vago: true },
        { id: 1, tipo: "Milan", vago: false },
        { id: 2, tipo: "Dubai", vago: true },
        { id: 3, tipo: "Dubai", vago: false },
        { id: 4, tipo: "New York", vago: true },
        { id: 5, tipo: "New York", vago: false },
      ]);
    case GET_RADIO_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default mngrPageReducer;
