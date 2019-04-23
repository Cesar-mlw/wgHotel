import { RADIO_CHANGE } from './constants'


export const radioChange = radio => ({
    type: RADIO_CHANGE,
    btnPressed: radio,
})