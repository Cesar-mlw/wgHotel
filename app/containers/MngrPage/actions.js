/*
 *
 * MngrPage actions
 *
 */

import { 
  GET_RADIO_DATA, 
  GET_RADIO_DATA_ERROR, 
  GET_RADIO_DATA_SUCCESS,
  GET_PRODUCT_DATA,
  GET_PRODUCT_DATA_SUCCESS,
  GET_PRODUCT_DATA_ERROR, 
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
export function getProductData(){
  return{
    type:GET_PRODUCT_DATA
  }
}
export function getProductDataSuccess(productList){
  return{
    type:GET_PRODUCT_DATA_SUCCESS,
    productList
  }
}
export function getProductDataError(error){
  return{
    type:GET_PRODUCT_DATA_ERROR,
    error
  }
}

