import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') || '');
    const role = decodedToken.role;
    if (role === 'USER') {
      return true;
    }
    else {
      this.router.navigate(['/notfound']);
      alert("you are not allowed to access")
      return false;
    }
  }
}
