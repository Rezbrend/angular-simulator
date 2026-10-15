import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CartService } from '../cart.service';
import { IProduct } from '../interfaces/IProduct';
import { ISelectOption } from '../interfaces/ISelectOption';
import { ProductSortField } from '../enums/product-sort-field';
import { ProductSortOrder } from '../enums/product-sort-order';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CardModule, PaginatorModule, SkeletonModule, FormsModule, InputTextModule, SelectModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);
  productService: ProductService = inject(ProductService);

  sortFieldOptions: ISelectOption[] = [
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.TITLE',
      value: ProductSortField.TITLE,
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.PRICE',
      value: ProductSortField.PRICE,
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.RATING',
      value: ProductSortField.RATING,
    },
    {
      label: 'PRODUCTS_PAGE.SORT_FIELD.STOCK',
      value: ProductSortField.STOCK,
    },
  ];

  sortOrderOptions: ISelectOption[] = [
    {
      label: 'PRODUCTS_PAGE.SORT_ORDER_OPTION.ASC',
      value: ProductSortOrder.ASC,
    },
    {
      label: 'PRODUCTS_PAGE.SORT_ORDER_OPTION.DESC',
      value: ProductSortOrder.DESC,
    },
  ];

  onPageChange(event: PaginatorState): void {
    const newPageSize: number = event.rows ?? this.productService.pageSize();
    if (newPageSize !== this.productService.pageSize()) {
      return this.productService.setPageSize(newPageSize);
    }
    const newPage: number = Math.floor((event.first ?? 0) / newPageSize);
    this.productService.setPage(newPage);
  }

  onProductClick(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onAddToCart(event: Event, product: IProduct): void {
    event.stopPropagation();
    this.cartService.addItem(product);
  }

}