import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search.component';
import { SearchBoxModule } from '../../shares/search-box/search-box.module';
import { SearchResultListModule } from '../../shares/search-result-list/search-result-list.module';

@NgModule({
  declarations: [GithubSearchComponent],
  imports: [CommonModule, SearchBoxModule, SearchResultListModule],
  exports: [GithubSearchComponent],
})
export class GithubSearchModule {}
