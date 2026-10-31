import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRecipeState } from '../interfaces/IRecipeState';

export const selectRecipesState = createFeatureSelector<IRecipeState>('recipes');

export const selectRecipes = createSelector(
  selectRecipesState,
  (state) => state.recipes
);

export const selectLoading = createSelector(
  selectRecipesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectRecipesState,
  (state) => state.error
);