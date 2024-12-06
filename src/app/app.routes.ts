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



export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'shop-cart', component: ShoppingCardComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'order-completed', component: CheckoutComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'catalog', component: CatalogComponent },
    {
        path: 'gifts', children: [
            { path: 'details/:giftId', component: GiftDetailsComponent },
            { path: ':giftId/edit', component: EditGiftComponent },
        ]
    },
    { path: 'create', component: CreateGiftComponent },

    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }

];
