import { mockResponse } from '../../_mockData/mockResponse';
import * as featureActions from './actions';
import { searchReducer } from './reducers';
import { initialState } from './state';

describe('Search Reducer', () => {
  it('should set loading to true on search action', () => {
    const action = featureActions.searchGithub({ query: 'angular' });
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.loaded).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should store results in cache on success', () => {
    const action = featureActions.searchGithubSuccess({
      query: 'angular',
      results: mockResponse,
    });
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
  });

  it('should handle failure and store error message', () => {
    const action = featureActions.searchGithubFailure({
      error: 'Network error',
    });
    const state = searchReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
    expect(state.error).toBe('Network error');
  });
});
