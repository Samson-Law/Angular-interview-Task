import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
      ],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit error when input has less than 3 characters', (done) => {
    const errorSpy = jest.spyOn(component.errorEvent, 'emit');

    component.searchControl.setValue('ab');
    fixture.detectChanges();

    setTimeout(() => {
      expect(errorSpy).toHaveBeenCalledWith(component.SEARCH_AT_LEAST);
      done();
    }, 600);
  });

  it('should emit search event when input has at least 3 characters', (done) => {
    const searchSpy = jest.spyOn(component.searchEvent, 'emit');
    const errorSpy = jest.spyOn(component.errorEvent, 'emit');

    component.searchControl.setValue('abc');
    fixture.detectChanges();

    setTimeout(() => {
      expect(errorSpy).toHaveBeenCalledWith('');
      expect(searchSpy).toHaveBeenCalledWith('abc');
      done();
    }, 600);
  });

  it('should clear search input when clearSearch is called', () => {
    component.searchControl.setValue('angular');
    fixture.detectChanges();

    component.clearSearch();
    fixture.detectChanges();

    expect(component.searchControl.value).toBe('');
  });

  it('should not emit an error if input is empty', (done) => {
    const errorSpy = jest.spyOn(component.errorEvent, 'emit');

    component.searchControl.setValue('');
    fixture.detectChanges();

    setTimeout(() => {
      expect(errorSpy).toHaveBeenCalledWith('');
      done();
    }, 600);
  });
});
