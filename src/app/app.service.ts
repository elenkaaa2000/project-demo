import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gift } from './types/gift';
//import { throwError, Observable, catchError } from 'rxjs';


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
    return this.http.get<Gift>('/api/gifts/details/' + giftId);
    
  }

  updateGiftById(giftId: string, title: string, category: string, description: string, price: string, delivery: string, imageUrl: string) {
    const payload = { title, category, description, price, delivery, imageUrl }
    return this.http.put<Gift>(`/api/gifts/${giftId}/edit`, payload)
  }

  deleteGiftById(giftId:string){
    return this.http.delete(`/api/gifts/${giftId}/delete`)
  }

  likeGift(giftId:string){
    return this.http.post<Gift>(`/api/gifts/${giftId}/like`, null)
  }

  buyGift(giftId:string){
    return this.http.put<Gift>(`/api/gifts/${giftId}/buy`, null)
  }

}

