import { fromJS } from 'immutable'


export const initialState = fromJS({
    btn_pressed: "room",
    data: []
  });


function radioChangeReducer(state = initialState, action){
    switch(action.type){
        case 'radioChange':
            state.set('btn_pressed', action.btn_pressed)
            return state.set('data', [{id:0, tipo:"Milan", vago: false}, {id:1, tipo:"Milan", vago: true}, {id:2, tipo:"Dubai", vago: false}])
            
        default:
            return state
    }
}


export default radioChangeReducer