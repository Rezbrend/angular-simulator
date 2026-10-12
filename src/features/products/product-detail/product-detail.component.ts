import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { Skeleton } from 'primeng/skeleton';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CardModule, TagModule, RatingModule, GalleriaModule, FormsModule, Skeleton, InputNumberModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  
  private cartService: CartService = inject(CartService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  product: IProduct = this.route.snapshot.data['product'];

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
  }

  addToCart() {
    this.cartService.addItem(this.product);
  }
  
}
