import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { AuthUser, User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<AuthUser | null>(null);
  private user$ = this.user$$.asObservable();

  user: AuthUser | null = null

  get isLogged(): boolean {
    return !!this.user
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      return this.user = user
    })
  }

  register(username: string, email: string, tel: string, password: string, rePassword: string) {
    return this.http
      .post<AuthUser>('/api/register', { username, email, tel, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  getUserProfile() {
    return this.http
      .get<AuthUser>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)))
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(tap((user) => this.user$$.next(null)))
  }

  editProfile(username: string, email: string, tel: string) {
    return this.http
      .put<AuthUser>('/api/users/profile', { username, email, tel })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  removeItemFromCard(id: string) {
    return this.http.put<AuthUser>(`/api/users/profile/${id}/shop-cartRemove`, {})
  }
  removeItemFromWishlist(id: string) {
    return this.http.put<AuthUser>(`/api/users/profile/${id}/wishlistRemove`, {})
  }

  clearShopCard() {
    return this.http.put<AuthUser>('/api/users/', {})
  }



}
