import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './environment/environment.development';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMsgService } from './shared/error-msg/error-msg.service';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true,
    })
  }

  const router = inject(Router);
  const errorMsgService = inject(ErrorMsgService)

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 /*Unauthorized*/) {
        router.navigate(['/login'])
      } else if(err.status === 404 || err.status ===500 ) {
        errorMsgService.setError(err)
        router.navigate(['/404'])
      }
      return [err]
    })
  )
};
