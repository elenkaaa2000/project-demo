import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(userData:any) {
    const { apiUrl } = environment
    return this.http.post(`${apiUrl}/register`, userData).subscribe(result => {
      console.log(result)
    })
  }
}
