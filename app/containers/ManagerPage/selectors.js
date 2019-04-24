import { createSelector } from 'reselect'
import { initialState } from './reducer'


const selectManagerPageDomain = state => state.get('managerPage', initialState)


const makeDataSelector = () => 
    createSelector(selectManagerPageDomain, substate => substate.get('data'))

export { makeDataSelector }