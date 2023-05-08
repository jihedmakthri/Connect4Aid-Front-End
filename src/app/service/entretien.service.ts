import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
  addentretien(Entretien: string): Observable<any> {
    const formData = new FormData();
    formData.append('entretien', Entretien);
    
    return this.http.post<any>("http://localhost:8082/newE", formData);
  }

  getentretien(){

  return this.http.get<any>("http://localhost:8082/FindAllE");
  }
  
  deleteentretien(id:number):Observable<Entretien[]>{
    return this.http.delete<[Entretien]>(this.urlApi+"/suppE/"+id);
  }

  updateentretien(data:any,id:number){
    return this.http.put<any>("http://localhost:8082/updateE/"+id,data );
  }
  
  getentretienById(id:number){
    return this.http.get<Entretien>(this.urlApi+"/getByIdE/"+id);
  }
  
  assignEntToCand(entretien: Entretien, idCandidate: number) {
    return this.http.post<any>(`http://localhost:8082/assignEntToCand/${idCandidate}`, entretien);
  }
  findAllCandidatesNotAssign(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>("http://localhost:8082/FindAllCandidatesNotAssign/");
  }
}


