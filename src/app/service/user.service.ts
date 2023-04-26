import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/user';

  constructor(private http: HttpClient) { }

  signUp(user: User) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/signup`, user,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

    forgotPassword(data: any) {
    return this.http.post(`${this.baseUrl}/forgotPassword`, data,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
    }
  login(loginCredentials: Login) {
    return this.http.post(`${this.baseUrl}/login`, loginCredentials,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
  verifySession(router:Router){
      let token:string;
    token=JSON.parse(localStorage.getItem('userId') || '{}');
    if(token='{}')
    {
        router.navigateByUrl('/signin')
      }
    }
}
