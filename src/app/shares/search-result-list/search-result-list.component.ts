import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GitHubRepository } from '../../_modules/github-search.model';

@Component({
  selector: 'app-search-result-list',
  standalone: false,
  templateUrl: './search-result-list.component.html',
  styleUrl: './search-result-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchResultListComponent {
  @Input() results: GitHubRepository[] = [];
}
