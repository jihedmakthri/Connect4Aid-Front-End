import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082';
  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  
  

  signUp(user: User) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/user/signup`, user,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

    forgotPassword(data: any) {
    return this.http.post(`${this.baseUrl}/user/forgotPassword`, data,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })});
    }
  login(loginCredentials: Login) {
    return this.http.post(`${this.baseUrl}/user/login`, loginCredentials,{headers:new HttpHeaders({ 'Content-Type': 'application/json' })})
  }
  getAllUsers() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/user/get`,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })})
  }
  activateAccount(data: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.baseUrl}/user/activateaccount`,data, {headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })} )
  }
  getUserById(id: any) {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/user/get/${id}`,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })})
  }
  changePassword(data: any) {
    const token = localStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/user/changePassword`,data,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })})
  }
  changeRole(data: any) {
    const token = localStorage.getItem('token')
    return this.http.post( `${this.baseUrl}/user/changerole`,data,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })} )
  }
  updateProfile(data: any,localID:string) {
    const token = localStorage.getItem('token')
    return this.http.post(`${this.baseUrl}/user/updateProfile/${localID}`,data,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })})
  }
  deleteAccount(id:string) {
    const token = localStorage.getItem('token')
      return this.http.post(`${this.baseUrl}/user/delete/${id}`,null,{headers:new HttpHeaders({ 'Content-Type': 'application/json' , Authorization : `Bearer ${token}` })})
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
