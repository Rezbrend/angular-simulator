import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IProduct } from './interfaces/IProduct';
import { ProductApiService } from './product-api.service';

export const productResolver: ResolveFn<IProduct> = async (route) => {
  const id: number = Number(route.paramMap.get('id'));
  return lastValueFrom(inject(ProductApiService).getProductById(id));
};