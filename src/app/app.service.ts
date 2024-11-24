import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment/environment.development';
import { Gift } from './types/gift';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAll() {
    const { apiUrl } = environment
    return this.http.get<Gift[]>(`${apiUrl}/data/catalog`)
  }

  getLastThree(limit?: number) {
    const { apiUrl } = environment
    return this.http.get<Gift[]>(`${apiUrl}/data?limit=${limit}`)
  }


}
