import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchBoxComponent {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() errorEvent = new EventEmitter<string>();

  searchControl = new FormControl('');
  searchTerm$: Observable<string>;
  SEARCH_AT_LEAST: string = 'Please enter at least 3 characters for search';

  constructor() {
    this.searchTerm$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((term) => term ?? '')
    );
    this.searchTerm$.subscribe((query) => {
      if (query.length === 0) {
        this.errorEvent.emit('');
        this.searchEvent.emit('');
      } else if (query.length < 3) {
        this.errorEvent.emit(this.SEARCH_AT_LEAST);
      } else {
        this.errorEvent.emit('');
        this.searchEvent.emit(query);
      }
    });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.searchEvent.emit('');
    this.errorEvent.emit('');
  }
}
