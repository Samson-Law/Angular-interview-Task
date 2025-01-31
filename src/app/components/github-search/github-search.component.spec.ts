import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubSearchComponent } from './github-search.component';
import { SearchBoxModule } from '../../shares/search-box/search-box.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SearchResultListModule } from '../../shares/search-result-list/search-result-list.module';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  selectCachedQuery,
  selectError,
  selectLoading,
} from '../../_root-store/github-search/selectors';
import * as featureActions from '../../_root-store/github-search/actions';
import { mockResponse } from '../../_mockData/mockResponse';

describe('GithubSearchComponent', () => {
  let component: GithubSearchComponent;
  let fixture: ComponentFixture<GithubSearchComponent>;
  let store: Store;

  // Mock data
  const mockResults = [mockResponse];
  const mockLoading = false;
  const mockError = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubSearchComponent],
      imports: [
        StoreModule.forRoot({}),
        SearchBoxModule,
        SearchResultListModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectLoading, value: mockLoading },
            { selector: selectError, value: mockError },
            { selector: selectCachedQuery('angular'), value: mockResults },
          ],
        }),
        provideAnimations(),
      ],
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(GithubSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch searchGithub action when handleSearch is called with a query', () => {
    const spy = jest.spyOn(store, 'dispatch'); // Spy on dispatch function

    component.handleSearch('angular');

    expect(spy).toHaveBeenCalledWith(
      featureActions.searchGithub({ query: 'angular' })
    );
  });

  it('should update results$ when handleSearch is called with a valid query', () => {
    component.handleSearch('angular');

    component.results$.subscribe((results) => {
      expect(results).toEqual(mockResults);
    });
  });

  it('should set results$ to an empty observable when handleSearch is called with an empty query', () => {
    component.handleSearch('');

    component.results$.subscribe((results) => {
      expect(results).toEqual([]);
    });
  });

  it('should correctly set loading$ and error$', () => {
    component.loading$.subscribe((loading) => {
      expect(loading).toBe(mockLoading);
    });

    component.error$.subscribe((error) => {
      expect(error).toBe(mockError);
    });
  });
});
