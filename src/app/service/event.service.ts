import { label } from './../model/Event/Label';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/Event/Event';
import Swal from 'sweetalert2';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root',
})
export class EvenetService {
  constructor(private http: HttpClient) {}
  getAll(reqPath: string, token: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${reqPath}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  getEvent(reqPath: string, token: string): Observable<Event> {
    return this.http.get<Event>(`${reqPath}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  deleteEvent(reqPath: string, token: string): Observable<string> {
    return this.http.post<string>(
      `${reqPath}`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        }),
      }
    );
  }
  postEvent(reqPath: string, token: string, pEvent: Event): Observable<Event> {
    return this.http.post<Event>(`${reqPath}`, JSON.stringify(pEvent), {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  filterEvent(reqPath: string, token: string, filter: any): Observable<Event> {
    return this.http.post<Event>(
      `${reqPath}`,
      JSON.stringify({
        filterStartDate: filter.filterStartDate,
        filterEndDate: filter.filterEndDate,
        filterName: filter.filterName,
      }),
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        }),
      }
    );
  }
  getlabels(reqPath: string, token: string): Observable<label[]> {
    return this.http.get<label[]>(`${reqPath}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  highUsers(reqPath: string, token: string): Observable<User[]> {
    return this.http.get<User[]>(`${reqPath}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  addLabel(reqPath: string, label: label, token: string): Observable<label> {
    return this.http.post<label>(`${reqPath}`, label, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
  deleteLabel(
    reqPath: string,
    label: label,
    token: string
  ): Observable<string> {
    return this.http.post<string>(`${reqPath}`, label, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
  }
}
