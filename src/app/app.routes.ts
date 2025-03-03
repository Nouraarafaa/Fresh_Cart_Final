import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [loggedGuard],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
                title: 'Login'
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
                title: 'Register'
            },
            {
                path: 'ForgetPassword',
                loadComponent: () => import('./components/forgetpassword/forgetpassword.component').then(c => c.ForgetpasswordComponent),
                title: 'Forget Password'
            }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
                title: 'Home'
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent),
                title: 'Cart'
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent),
                title: 'Products'
            },
            {
                path: 'brands',
                loadComponent: () => import('./pages/brands/brands.component').then(c => c.BrandsComponent),
                title: 'Brands'
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/categories/categories.component').then(c => c.CategoriesComponent),
                title: 'Categories'
            },
            {
                path: 'details/:ItemId',
                component: DetailsComponent,
                title: 'Details'
            },
            {
                path: 'checkout/:Id',
                loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent),
                title: 'Checkout'
            },
            {
                path: 'allorders',
                loadComponent: () => import('./pages/allorders/allorders.component').then(c => c.AllordersComponent),
                title: 'Orders'
            },
            {
                path: '**',
                loadComponent: () => import('./pages/notfound/notfound.component').then(c => c.NotfoundComponent),
                title: 'Not Found'
            }
        ]
    }
];
