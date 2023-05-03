import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/Event/Event';
import Swal from 'sweetalert2';
import { label } from '../model/Event/Label';
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
    return this.http.delete<string>(`${reqPath}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
    });
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
}
