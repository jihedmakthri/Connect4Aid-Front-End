import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import{Candidature} from '../model/Candidature'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceCandidatureService {
  urlApi = 'http://localhost:8082';  // URL de l'API

  constructor(private http: HttpClient ) {

  }

  addCandidature(candidature: string, file: File): Observable<any> {const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
    const formData = new FormData();
    formData.append('candidature', candidature);
    formData.append('file', file);
  
    return this.http.post<any>('/addCV', formData,{headers:headers});
  }
  
  getCandidature(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<any>("http://localhost:8082/findAllcandidates",{headers:headers});

  }
  



  deleteCandidature(id: number) : Observable<Candidature[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<[Candidature]>(this.urlApi+"/supp/"+id,{headers:headers});
  }



  postCandidature(data : any){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<any>("http://localhost:8082/newcandidates",data,{headers:headers});

  }
 /* addExperience(experience:Experience): Observable<Experience>{
    return this.http.post<Experience>(`${this.urlApi+"/add"}`,experience);
  }*/

  updateCandidature(data:any,id:number){const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

    return this.http.post<any>("http://localhost:8082/updatecandidate/"+id,data,{headers:headers})
    }
    /*updateCandidature(id:number, candidature: Candidature){


    return this.http.put(`${this.urlApi+"/updatecandidate/"+id}`,candidature);
   }*/

   getCandidatureById(id:Number){const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
     return this.http.get<Candidature>(this.urlApi+"/getByIdcandidate/"+id,{headers:headers});
   }

   exportPdfCandidatures():Observable<Blob>{const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
    return this.http.get("http://localhost:8082/export/pdf", {responseType: 'blob',headers:headers });
   }
    exportExcelCandidatures():Observable<Blob>{const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get("http://localhost:8082/export/excel", {responseType: 'blob',headers:headers});
}
getentretienById(idEntretien:number){const headers = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem('token')
});

  return this.http.get<any>("http://localhost:8082/getByIdE/"+idEntretien,{headers:headers});
  }
  assignCandidatureToEntretien(idCondidate: number, idEntretien: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const url = `http://localhost:8082/assign/${idCondidate}/${idEntretien}`;
    return this.http.put(url, {},{headers:headers});
  }
  
}
