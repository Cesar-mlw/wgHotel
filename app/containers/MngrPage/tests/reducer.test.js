import { fromJS } from 'immutable';
import mngrPageReducer from '../reducer';

describe('mngrPageReducer', () => {
  it('returns the initial state', () => {
    expect(mngrPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
