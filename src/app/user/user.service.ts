import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      .pipe(tap((user) => this.user$$.next(user)),
        catchError((error) => this.handleError(error)))
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)), catchError((error) => this.handleError(error)))
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.status === 409) {
      errorMessage = 'Email is already registered.';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error. Please try again later.';
    } else if (error.status === 401){
      errorMessage = 'Wrong email or password!'
    }

    return throwError(() => new Error(errorMessage));
  }
}


