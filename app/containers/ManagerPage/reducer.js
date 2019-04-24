import { fromJS } from 'immutable'
import { LOAD_RADIO_DATA } from './constants'  


export const initialState = fromJS({
    btnPressed: "room",
    data: [{id:0, tipo:"Milan", vago: false}, {id:1, tipo:"Milan", vago: true}, {id:2, tipo:"Dubai", vago: false}]
  });


const managementReducer = (state = initialState, action) => {
    switch(action.type){
        case RADIO_CHANGE:
            return state
                .set('btnPressed', action.btnPressed)
                .set('data', [{id:0, tipo:"Milan", vago: false}, {id:1, tipo:"Milan", vago: true}, {id:2, tipo:"Dubai", vago: false}])
            
        default:
            return state
    }
}


export default managementReducer