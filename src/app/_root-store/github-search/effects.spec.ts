import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { expect } from '@jest/globals';
import { selectCachedQuery } from './selectors';
import { SearchEffects } from './effects';
import * as featureActions from './actions';
import { GithubSearchService } from '../../_services/github-search.service';
import { provideMockStore } from '@ngrx/store/testing';
import { GitHubSearchResponse } from '../../_modules/github-search.model';
import { mockResponse } from '../../_mockData/mockResponse';

jest.mock('../../_services/github-search.service');

describe('SearchEffects', () => {
  let actions$: Actions;
  let effects: SearchEffects;
  let githubSearchService: jest.Mocked<GithubSearchService>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})], // Setup your store if needed
      providers: [
        SearchEffects,
        provideMockStore({
          selectors: [
            {
              selector: selectCachedQuery('angular'), // Mock the query 'angular'
              value: mockResponse as GitHubSearchResponse, // Return a mock cached result
            },
          ],
        }),
        Actions,
        // Provide the mock of the GithubSearchService
        {
          provide: GithubSearchService,
          useValue: {
            searchRepositories: jest.fn(), // Use jest.fn() for mocking the function
          },
        },
      ],
    });

    // Get instances of the service and the effects
    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(SearchEffects);
    githubSearchService = TestBed.inject(
      GithubSearchService
    ) as jest.Mocked<GithubSearchService>;
    store = TestBed.inject(Store);
  });

  it('should return searchGithubSuccess when repositories are fetched successfully', () => {
    const mockQuery = 'angular';
    const mockResult: GitHubSearchResponse[] = [mockResponse];

    // Mock the implementation of searchRepositories to return a value
    githubSearchService.searchRepositories.mockReturnValue(of(mockResult));

    const action = featureActions.searchGithub({ query: mockQuery });
    const successAction = featureActions.searchGithubSuccess({
      query: mockQuery,
      results: mockResult,
    });

    actions$ = of(action);

    effects.searchGithub$.subscribe((result) => {
      expect(result).toEqual(successAction);
      expect(githubSearchService.searchRepositories).toHaveBeenCalledWith(
        mockQuery
      );
    });
  });

  it('should return searchGithubFailure when the API request fails', () => {
    const mockQuery = 'angular';

    // Mock the searchRepositories to simulate a failed API request
    githubSearchService.searchRepositories.mockReturnValue(of([])); // Simulating an empty result on failure

    const action = featureActions.searchGithub({ query: mockQuery });
    const failureAction = featureActions.searchGithubFailure({
      error: 'Failed to fetch results', // Mock failure message
    });

    actions$ = of(action);

    effects.searchGithub$.subscribe((result) => {
      expect(result).toEqual(failureAction);
      expect(githubSearchService.searchRepositories).toHaveBeenCalledWith(
        mockQuery
      );
    });
  });
});
