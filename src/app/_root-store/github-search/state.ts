import { GitHubSearchResponse } from '../../_modules/github-search.model';

export interface SearchState {
  cache: { [query: string]: GitHubSearchResponse };
  query: string | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialState: SearchState = {
  cache: {},
  query: null,
  loading: false,
  loaded: false,
  error: null,
};
