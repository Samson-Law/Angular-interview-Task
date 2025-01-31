import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { GitHubSearchResponse } from '../_modules/github-search.model';

@Injectable({
  providedIn: 'root',
})
export class GithubSearchService {
  private baseUrl = environment.githubUrl;

  constructor() {}

  searchRepositories(query: string): Observable<GitHubSearchResponse[]> {
    const url = `${this.baseUrl}/search/repositories?q=${query}`;

    return from(
      fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
    ).pipe(
      map((data) => data || []),
      catchError((error) => {
        if (error != null || undefined || '') {
          console.error('GitHub API Error:', error);
        }

        return of([]);
      })
    );
  }
}
