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
import { SearchComponent } from './search/search.component';




export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'shop-cart', component: ShoppingCardComponent, canActivate: [AuthGuard] },
    { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
    { path: 'order-completed', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutPageComponent },
    { path: 'catalog', component: CatalogComponent },
    {
        path: 'gifts', children: [
            { path: 'details/:giftId', component: GiftDetailsComponent },
            { path: ':giftId/edit', component: EditGiftComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'create', component: CreateGiftComponent, canActivate: [AuthGuard] },
    {path: 'search', component: SearchComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }

];
