import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as featureActions from './actions';
import { selectCachedQuery } from './selectors';
import { GithubSearchService } from '../../_services/github-search.service';

@Injectable()
export class SearchEffects {
  searchGithub$;
  SEARCH_RESULTS_FAILED = 'Failed to fetch results';

  constructor(
    private actions$: Actions,
    private githubSearchService: GithubSearchService,
    private store: Store
  ) {
    this.searchGithub$ = createEffect(() =>
      this.actions$.pipe(
        ofType(featureActions.searchGithub),
        mergeMap((action) =>
          this.store.pipe(
            select(selectCachedQuery(action.query)),
            mergeMap((cachedResult) => {
              if (cachedResult) {
                return of(
                  featureActions.searchGithubSuccess({
                    query: action.query,
                    results: cachedResult,
                  })
                );
              }
              return this.githubSearchService
                .searchRepositories(action.query)
                .pipe(
                  map((results) => {
                    return featureActions.searchGithubSuccess({
                      query: action.query,
                      results,
                    });
                  }),
                  catchError((error) =>
                    of(
                      featureActions.searchGithubFailure({
                        error: error.message || this.SEARCH_RESULTS_FAILED,
                      })
                    )
                  )
                );
            })
          )
        )
      )
    );
  }
}
