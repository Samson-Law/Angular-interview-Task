import { createReducer, on, Action } from '@ngrx/store';
import { initialState, SearchState } from './state';
import * as featureActions from './actions';

const featureReducer = createReducer(
  initialState,
  on(featureActions.searchGithub, (state, { query }) => ({
    ...state,
    query: query,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(featureActions.searchGithubSuccess, (state, { query, results }) => ({
    ...state,
    loading: false,
    loaded: true,
    cache: { ...state.cache, [query]: results },
  })),
  on(featureActions.searchGithubFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  }))
);

export function searchReducer(state: SearchState | undefined, action: Action) {
  return featureReducer(state, action);
}
