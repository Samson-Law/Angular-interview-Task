import { createAction, props } from '@ngrx/store';

const SEARCH_GITHUB = '[Search] Search Github';
const SEARCH_GITHUB_FAIL = '[Search] Search Github Failure';
const SEARCH_GITHUB_SUCCESS = '[Search] Search Github Success';

export const searchGithub = createAction(
  SEARCH_GITHUB,
  props<{ query: string }>()
);

export const searchGithubSuccess = createAction(
  SEARCH_GITHUB_SUCCESS,
  props<{ query: string; results: any }>()
);

export const searchGithubFailure = createAction(
  SEARCH_GITHUB_FAIL,
  props<{ error: string }>()
);
