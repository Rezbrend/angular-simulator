import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { recipeActions } from './recipes.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { IRecipe } from '../interfaces/IRecipe';
import { RecipeApiService } from '../services/recipe-api-service';

@Injectable()
export class RecipesEffect {

  private recipeApiService: RecipeApiService = inject(RecipeApiService);
  private actions$: Actions = inject(Actions);

  loadRecipes$ = createEffect(() => this.actions$.pipe(
    ofType(recipeActions.loadRecipes),
    switchMap(() => this.recipeApiService.getRecipes()
      .pipe(
        map((recipes: IRecipe[]) => recipeActions.loadRecipesSuccess({ recipes })),
        catchError(() => of(recipeActions.loadRecipesFailure({ error: 'Ошибка при загрузке рецептов' }))),
      )),
  ));

}