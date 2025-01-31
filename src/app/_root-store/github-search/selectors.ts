import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './state';

export const selectSearchState =
  createFeatureSelector<SearchState>('githubSearch');

export const selectCachedQuery = (query: string) =>
  createSelector(
    selectSearchState,
    (state: SearchState) => state.cache[query] || null
  );

export const searchQuery = createSelector(
  selectSearchState,
  (state: SearchState) => state?.query ?? null
);

export const selectLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state?.loading ?? false
);

export const searchLoaded = createSelector(
  selectSearchState,
  (state: SearchState): boolean => state.loaded
);

export const selectError = createSelector(
  selectSearchState,
  (state: SearchState) => state?.error ?? null
);
