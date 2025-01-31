import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { searchReducer } from './reducers';
import { SearchEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('githubSearch', searchReducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
})
export class GithubSearchModule {}
