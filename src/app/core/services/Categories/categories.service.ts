<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
>>>>>>> 13e594b (Initial commit)
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

<<<<<<< HEAD
  constructor(private httpClient: HttpClient) { }

  getAllCategories():Observable<any>{
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  GetSpecificCategory( id:string ):Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

=======
  constructor( private httpClient:HttpClient) { }

  getAllCategories():Observable<any>
  {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  getSpecificCategories( id:string ):Observable<any>
  {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${ id }`);
  }
  getSubCategories():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/subcategories');
  }
  GetBrands():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
>>>>>>> 13e594b (Initial commit)
}
