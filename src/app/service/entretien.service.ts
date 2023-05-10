import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import{Entretien} from '../model/entretien';
import{Candidature} from '../model/Candidature';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  urlApi='http://localhost:8082'; 

  constructor(private http: HttpClient ) { 
  }
 
  /* addentretien(data : any){
    const formData = new FormData();
    formData.append('candidature', Entretien);
    return this.http.post<any>("http://localhost:8082/test/newE",data);

  }*/
  addentretien(Entretien: string): Observable<any> {const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
    const formData = new FormData();
    formData.append('entretien', Entretien);
    
    return this.http.post<any>("http://localhost:8082/newE", formData,{headers:headers});
  }

  getentretien(){const token = localStorage.getItem('token');
  console.log('Token:', token);
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });
    console.log('Headers:', headers);

  return this.http.get<any>("http://localhost:8082/FindAllE",{headers:headers});
  }
  
  deleteentretien(id:number):Observable<Entretien[]>{const token = localStorage.getItem('token');
  console.log('Token:', token);
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });
    console.log('Headers:', headers);
    return this.http.post<[Entretien]>(this.urlApi+"/suppE/"+id,{headers:headers});
  }

  updateentretien(data:any,id:number){const token = localStorage.getItem('token');
  console.log('Token:', token);
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });
    console.log('Headers:', headers);
    return this.http.post<any>("http://localhost:8082/updateE/"+id,data ,{headers:headers});
  }
  
  getentretienById(id:number){
    const token = localStorage.getItem('token');
   console.log('Token:', token);
   const headers = new HttpHeaders({
     'Authorization': 'Bearer ' + token
   });
     console.log('Headers:', headers);
    return this.http.get<Entretien>(this.urlApi+"/getByIdE/"+id,{headers:headers});
  }
  
  assignEntToCand(entretien: Entretien, idCandidate: number) {
    const token = localStorage.getItem('token');
   console.log('Token:', token);
   const headers = new HttpHeaders({
     'Authorization': 'Bearer ' + token
   });
     console.log('Headers:', headers);
    return this.http.post<any>(`http://localhost:8082/assignEntToCand/${idCandidate}`, entretien,{headers:headers});
  }
  findAllCandidatesNotAssign(): Observable<Candidature[]> {
    const token = localStorage.getItem('token');
   console.log('Token:', token);
   const headers = new HttpHeaders({
     'Authorization': 'Bearer ' + token
   });
     console.log('Headers:', headers);
    return this.http.get<Candidature[]>("http://localhost:8082/FindAllCandidatesNotAssign/",{headers:headers});
  }
}


