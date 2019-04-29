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
  createSelector(selectMngrPageDomain, substate => substate.get('data'))

export default makeSelectMngrPage;
export { selectMngrPageDomain, makeRadioDataSelector };
