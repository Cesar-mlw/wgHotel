import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mngrPage state domain
 */

const selectMngrPageDomain = state => state.get('mngrPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MngrPage
 */

const makeSelectMngrPage = () =>
  createSelector(selectMngrPageDomain, substate => substate.toJS());

const makeRadioDataSelector = () =>
  createSelector(selectMngrPageDomain, substate => substate.get('roomData'))

const makeProductListSelector = () =>
  createSelector(selectMngrPageDomain, substate => substate.get('productList').toJS())

const makeGuestDataSelector = () =>
  createSelector(selectMngrPageDomain, substate => substate.get('guestData'))

const makeOccupationDataSelector = () => 
  createSelector(selectMngrPageDomain, substate => substate.get('occupationList'))

export default makeSelectMngrPage;
export { selectMngrPageDomain, makeRadioDataSelector, makeProductListSelector, makeGuestDataSelector, makeOccupationDataSelector };
