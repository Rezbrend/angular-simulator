import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRecipe } from '../interfaces/IRecipe';
import { IRecipeResponse } from '../interfaces/IRecipeResponse';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  private httpClient: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'https://dummyjson.com';

  getRecipes(): Observable<IRecipe[]> {
    return this.httpClient.get<IRecipeResponse>(`${ this.API_URL }/recipes`)
      .pipe(
        map((response: IRecipeResponse) => response.recipes),
      );
  }

}