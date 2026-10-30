import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/IRecipe';
import { Store } from '@ngrx/store';
import { selectRecipes, selectLoading, selectError } from '../state/recipes.selectors';
import { recipeActions } from '../state/recipes.actions';

@Component({
  selector: 'app-recipe',
  imports: [AsyncPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipeComponent implements OnInit {

  private readonly store: Store = inject(Store);

  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  isLoading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  ngOnInit(): void {
    this.loadRecipes();
  }

  reloadRecipes(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }

}