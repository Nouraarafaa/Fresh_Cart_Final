import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken: any = localStorage.getItem('UserToken');

  constructor(private httpClient: HttpClient) { }
  AddProduct(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        "productId": id
      }
    )
  }

  GetCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart'
    )
  }

  RemoveItem(id: string): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    )
  }
  UpdateQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        "count": newCount
      }
    )
  }
  cash!: boolean;
  CashOrVisa(choice: string) {
    if (choice === 'cash') {
      this.cash = true;
    }
    else {
      this.cash = false;
    }
  }

  ClearCart(): Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/`
    )
  }
}
