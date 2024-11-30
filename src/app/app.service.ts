import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gift } from './types/gift';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Gift[]>(`/api/gifts`)
  }

  getLastThree(limit?: number) {
    return this.http.get<Gift[]>(`/api/gifts/home?limit=${limit}`)
  }

  createGift(title: string, category: string, description: string, price: number, delivery: number, imageUrl: string) {
    return this.http
      .post<Gift>('/api/gifts', { title, category, description, price, delivery, imageUrl });
  }

  getGiftById(giftId: string) {
    return this.http.get<Gift>('/api/gifts/details/' + giftId)
  }


}
