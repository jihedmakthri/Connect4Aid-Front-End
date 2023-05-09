import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../model/donation';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiURL = "http://localhost:8082/payment";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get(this.apiURL + '/findAll')
  }
  add( Payment: Payment , id:any){
    return this.httpClient.post(this.apiURL + '/add/'+id,Payment)
  }

}
