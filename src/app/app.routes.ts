import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ErrorComponent } from './error/error.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateGiftComponent } from './gift/create-gift/create-gift.component';
import { EditGiftComponent } from './gift/edit-gift/edit-gift.component';
import { GiftDetailsComponent } from './gift/gift-details/gift-details.component';
import { ArticlesComponent } from './blog/articles/articles.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'create', component: CreateGiftComponent },
    { path: 'blog', component: ArticlesComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }

];
