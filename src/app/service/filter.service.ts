import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

    verifySession(router:Router){
      let token:string;
    token=JSON.parse(localStorage.getItem('userId') || '{}');
    if(token='{}')
    {
        router.navigateByUrl('/signin')
      }
    }
}
