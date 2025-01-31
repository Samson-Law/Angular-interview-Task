import { Component, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as featureActions from '../../_root-store/github-search/actions';
import {
  selectCachedQuery,
  selectError,
  selectLoading,
} from '../../_root-store/github-search/selectors';
import { Observable } from 'rxjs';
import { GitHubSearchResponse } from '../../_modules/github-search.model';

@Component({
  selector: 'app-github-search',
  standalone: false,
  templateUrl: './github-search.component.html',
  styleUrl: './github-search.component.scss',
})
export class GithubSearchComponent {
  results$: Observable<GitHubSearchResponse> = new Observable();
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
  }

  ngOnInit(): void {}

  handleSearch(query: string) {
    if (query) {
      this.store.dispatch(featureActions.searchGithub({ query: query }));
      this.results$ = this.store.pipe(select(selectCachedQuery(query)));
    } else {
      this.results$ = new Observable();
    }
  }
}
