import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/post.resolver';
import { productResolver } from '../features/products/product.resolver';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/components/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('../features/home/home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('../features/products/products/products.component').then((c) => c.ProductsComponent),
        children: [
          {
            path: ':id',
            loadComponent: () => import('../features/products/product-detail/product-detail.component').then((c) => c.ProductDetailComponent),
            resolve: { product: productResolver },
          },
        ],
      },
      {
        path: 'cart',
        loadComponent: () => import('../features/products/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: 'posts',
        loadComponent: () => import('../features/posts/posts/posts.component').then((m) => m.PostsComponent),
        canActivate: [adminGuard],
        children: [
          {
            path: 'create',
            loadComponent: () => import('../features/posts/post-create/post-create.component').then((m) => m.PostCreateComponent),
          },
          {
            path: ':id',
            loadComponent: () => import('../features/posts/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
            resolve: { post: postResolver },
          },
        ],
      },
      {
        path: 'users',
        loadComponent: () => import('../features/users/users-page/users-page.component').then((m) => m.UsersPageComponent),
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('../features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./core/components/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
