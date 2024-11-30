import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gift } from './types/gift';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAll() {
 
    return this.http.get<Gift[]>(`/api/gifts/catalog`)
  }

  getLastThree(limit?: number) {
    
    return this.http.get<Gift[]>(`/api/gifts?limit=${limit}`)
  }


}
