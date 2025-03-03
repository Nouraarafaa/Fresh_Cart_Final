import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //api
  constructor( private httpClient:HttpClient ) { }

  GetALLProducts():Observable<any>
  {
    return this.httpClient.get( 'https://ecommerce.routemisr.com/api/v1/products' );
  }
  
  GetSpecificProduct( id:string | null ):Observable<any>
  {
    return this.httpClient.get( `https://ecommerce.routemisr.com/api/v1/products/${id}` );
  }


}
