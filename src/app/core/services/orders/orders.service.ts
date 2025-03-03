import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient : HttpClient) { }

  myToken:any  =  localStorage.getItem('UserToken');

  CheckVisaPayment( id:string , data:object ):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
            
    }
    )
  }
  CheckCashPayment( Id:string , Userdata:object ):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${Id}`,
      {
        "shippingAddress": Userdata
            
    }
    )
  }
}
