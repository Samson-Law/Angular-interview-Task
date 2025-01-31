import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultListComponent } from './search-result-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SearchResultListComponent],
  imports: [CommonModule, MatListModule, MatCardModule, MatButtonModule],
  exports: [SearchResultListComponent],
})
export class SearchResultListModule {}
