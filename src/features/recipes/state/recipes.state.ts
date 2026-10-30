import { IRecipeState } from '../interfaces/IRecipeState';

export const initialState: IRecipeState = {
  recipes: [],
  loading: false,
  error: null,
};