import { LOAD_RADIO_DATA } from './constants'


export function loadRadioData(btnPressed){
    return {
        type: LOAD_RADIO_DATA,
        btnPressed
    }
}