/*
 *
 * MngrPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_RADIO_DATA,
  GET_RADIO_DATA_SUCCESS,
  GET_RADIO_DATA_ERROR,
  GET_PRODUCT_DATA,
  GET_PRODUCT_DATA_ERROR,
  GET_PRODUCT_DATA_SUCCESS,
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
  productList: [
    { id:0, nome:"Coca-Cola", preco:12.50, qtde:8 },
    { id:1, nome:"Chocolate Godiva", preco:55.99, qtde:12 },
    { id:2, nome:"Red Label", preco:120.00, qtde:3 },
    { id:3, nome:"Corona", preco:20.00, qtde:8 },
    { id:4, nome:"Lays Potato Chips", preco:35.00, qtde:8 },
    { id:5, nome:"Milano Cookies", preco:15.00, qtde:36 },
  ],
  selectedRadio: 'room',
});

function mngrPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RADIO_DATA:
      if(action.selectedValue == "room"){
        return state.set('loading', true).set('error', false).set('selectedRadio', 'room');  
      }
      else if(action.selectedValue == "guests"){
        console.log(action.selectedValue)
        return state.set('loading', true).set('error', false).set('selectedRadio', 'guests');  
      }
      
    case GET_RADIO_DATA_SUCCESS:
      if(state.selectedRadio == "room"){
        return state.set('loading', false).set('error', false).set('data', [
          { id: 0, tipo: "Milan", vago: true },
          { id: 1, tipo: "Milan", vago: false },
          { id: 2, tipo: "Dubai", vago: true },
          { id: 3, tipo: "Dubai", vago: false },
          { id: 4, tipo: "New York", vago: true },
          { id: 5, tipo: "New York", vago: false },
        ])
      }
      else if(state.selectedRadio == 'guests'){
        return state.set('loading', false).set('error', false).set('data', [
          {id:0, name:"Bernardo Favaretto", hospedado: true, meioPagamento: 'cartaoCredito'},
          {id:1, name:"Jorge Favaretto", hospedado: true, meioPagamento: 'cheque'},
          {id:2, name:"Bruna Favaretto", hospedado: false, meioPagamento: 'dinheiro'},
          {id:3, name:"Rodrigo Favaretto", hospedado: false, meioPagamento: 'cartaoDebito'},
        ])
      }
      

    case GET_RADIO_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case GET_PRODUCT_DATA:
      state.set('loading', true).set('error', false);
    case GET_PRODUCT_DATA_SUCCESS:
      state.set('loading', false).set('error', false).set('productList', [
        { id:0, nome:"Coca-Cola", preco:12.50, qtde:8 },
        { id:1, nome:"Chocolate Godiva", preco:55.99, qtde:12 },
        { id:2, nome:"Red Label", preco:120.00, qtde:3 },
        { id:3, nome:"Corona", preco:20.00, qtde:8 },
        { id:4, nome:"Lays Potato Chips", preco:35.00, qtde:8 },
        { id:5, nome:"Milano Cookies", preco:15.00, qtde:36 },
      ])
    case GET_PRODUCT_DATA_ERROR:
      state.set('loading', false).set('error', action.error)
    default:
      return state;
  }
}

export default mngrPageReducer;
