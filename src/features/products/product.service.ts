import { Injectable, inject, WritableSignal, signal, computed, Signal, effect } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from './interfaces/IProduct';
import { IProductResponse } from './interfaces/IProductResponse';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { toObservable, toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ResourceRef } from '@angular/core';
import { ICategory } from './interfaces/ICategory';
import { IProductQueryParams } from './interfaces/IProductQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productApi: ProductApiService = inject(ProductApiService);
  
  currentPage: WritableSignal<number> = signal<number>(0);
  pageSize: WritableSignal<number> = signal<number>(10);
  searchQuery: WritableSignal<string> = signal<string>('');
  sortField: WritableSignal<string> = signal<string>('title');
  sortOrder: WritableSignal<string> = signal<string>('asc');
  categories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
  selectedCategory: WritableSignal<string> = signal<string>('');
  skip: Signal<number> = computed(() => this.currentPage() * this.pageSize());
  total: Signal<number> = computed(() => this.productsResource.value()?.total ?? 0);
  isLoadingProduct: Signal<boolean> = computed(() => this.productsResource.isLoading());
  
  products: Signal<IProduct[]> = computed(() => {
    const value: IProductResponse = this.productsResource.value();
    return value?.products??[];
  });

  private debouncedSearchQuery: Signal<string> = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  productsResource: ResourceRef<IProductResponse> = rxResource({
    params: () => ({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      sortField: this.sortField(),
      sortOrder: this.sortOrder(),
      category: this.selectedCategory(),
      query: this.debouncedSearchQuery()
    }),
    stream: ({ params }) => {
      const skip: number = params.page * params.pageSize;
      const queryParams: IProductQueryParams = {
        limit: params.pageSize,
        skip,
        sortBy: params.sortField,
        order: params.sortOrder
      };
      if (params.query) {
        return this.productApi.searchProducts(params.query, queryParams);
      }
      if (params.category) {
        return this.productApi.getProductsByCategory(params.category, queryParams);
      }
      return this.productApi.getProducts(queryParams);
    }, defaultValue: { products: [], total: 0, limit: 0, skip: 0 }
  });

  constructor() {
    this.loadCategories();
    
    effect(() => {
      this.pageSize();
      this.searchQuery();
      this.sortField();
      this.sortOrder();
      this.selectedCategory();
      this.currentPage.set(0);

    });
  }
  
  loadCategories(): void {
    this.productApi.getCategories().pipe(
      tap((response: ICategory[]) => {
        this.categories.set(response);
      })
    ).subscribe();
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }

  setPageSize(size: number): void {
    if (size > 0) {
      this.pageSize.set(size);
    }
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setSortField(field: string): void {
    this.sortField.set(field);
  }

  setSortOrder(order: string): void {
    this.sortOrder.set(order);
  }

  resetSort(category: string): void {
    this.selectedCategory.set(category);
  }

}
