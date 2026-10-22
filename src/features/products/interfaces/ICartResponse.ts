import { ICartItem } from './ICartItem';

export interface ICartResponse {
  id: number;
  userId: number;
  products: ICartItem;
  total: number;
  discount: number;
}