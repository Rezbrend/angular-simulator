import { createReducer, on } from '@ngrx/store';
import { initialState } from './recipes.state';
import { recipeActions } from './recipes.actions';

export const recipesReducer = createReducer(
  initialState,
  on(recipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(recipeActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
  })),
  on(recipeActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);