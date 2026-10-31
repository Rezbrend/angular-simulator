import { IRecipe } from './IRecipe';

export interface IRecipeResponse {
  recipes: IRecipe[];
  total: number;
  limit: number;
  skip: number;
}