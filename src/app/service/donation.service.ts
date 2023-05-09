import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Donation} from "../model/donation";

@Injectable({
  providedIn: 'root'
})
export class DonationService {


  private apiURL = "http://localhost:8082/donation";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Donation[]> {
    return this.httpClient.get<Donation[]>(this.apiURL + '/findAll/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(donation: Donation): Observable<Donation> {
    return this.httpClient.post<Donation>(this.apiURL + '/add', JSON.stringify(donation), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Donation> {
    return this.httpClient.get<Donation>(this.apiURL + '/get/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  searchByType(type:any){
    return this.httpClient.get<any>(this.apiURL + '/getByType/' + type)
  }
}
