import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PageNotFoundComponent } from './404/404.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateGiftComponent } from './gift/create-gift/create-gift.component';
import { EditGiftComponent } from './gift/edit-gift/edit-gift.component';
import { GiftDetailsComponent } from './gift/gift-details/gift-details.component';

import { ShoppingCardComponent } from './user/profile/shopping-card/shopping-cart.component';
import { CheckoutComponent } from './user/profile/checkout/checkout.component';
import { WishlistComponent } from './user/profile/wishlist/wishlist.component';
import { AuthGuard } from './utils/auth.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';




export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', loadComponent: () => import('../app/user/profile/profile.component').then(c => c.ProfileComponent), canActivate: [AuthGuard] },
    { path: 'shop-cart', loadComponent: () => import('../app/user/profile/shopping-card/shopping-cart.component').then(c => c.ShoppingCardComponent), canActivate: [AuthGuard] },
    { path: 'wishlist', loadComponent: () => import('../app/user/profile/wishlist/wishlist.component').then(c => c.WishlistComponent), canActivate: [AuthGuard] },
    { path: 'order-completed', loadComponent: () => import('../app/user/profile/checkout/checkout.component').then(c => c.CheckoutComponent), canActivate: [AuthGuard] },
    { path: 'about', loadComponent: () => import('../app/about-page/about-page.component').then(c => c.AboutPageComponent) },
    { path: 'catalog', loadComponent: () => import('../app/catalog/catalog.component').then(c => c.CatalogComponent) },
    {
        path: 'gifts', children: [
            { path: 'details/:giftId', loadComponent: () => import('../app/gift/gift-details/gift-details.component').then(c => c.GiftDetailsComponent), },
            {
                path: ':giftId/edit', loadComponent: () => import('../app/gift/edit-gift/edit-gift.component').then(c => c.EditGiftComponent),
                canActivate: [AuthGuard]
            },
        ]
    },
    {
        path: 'create',
        loadComponent: () => import('../app/gift/create-gift/create-gift.component').then(c => c.CreateGiftComponent),
        canActivate: [AuthGuard]
    },

    { path: 'privacy-policy', loadComponent: () => import('../app/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent) },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }

];
