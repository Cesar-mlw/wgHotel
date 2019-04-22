import { fromJS } from 'immutable'


export const initialState = fromJS({
    btn_presse: "room"
  });


function radioChangeReducer(state = initialState, action){
    switch(action.type){
        case 'radioChange':
            return state.set('btn_pressed', action.btn_pressed)
            
        default:
            return state
    }
}


export default radioChangeReducer