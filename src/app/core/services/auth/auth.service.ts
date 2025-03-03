import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient: HttpClient ) { }

  private readonly router = inject(Router);
  UserData:any = null;

  SendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  SendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  SaveUserData(): void {
    let token:any = localStorage.getItem('UserToken');
    if (token !== null) {
      this.UserData = jwtDecode(token);
    }
  }  
  
  LogOut():void{
    localStorage.removeItem('UserToken');
    this.UserData = null;
    this.router.navigate(['/login']);
  }

SetEmailApi( data:object ): Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data);
}
VerifyCode( data:object ): Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data);
}
ResetPassword( data:object ): Observable<any>{
  return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data);
}

}
