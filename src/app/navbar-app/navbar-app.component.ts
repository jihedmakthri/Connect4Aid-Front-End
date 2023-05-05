import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar-app',
  templateUrl: './navbar-app.component.html',
  styleUrls: ['./navbar-app.component.css']
})
export class NavbarAppComponent implements OnInit {

  constructor(private router:Router,private jwtFilter :JwtHelperService) { }
  token: any = localStorage.getItem('token')
  disable!: boolean
  ngOnInit(): void {
    const decodeToken = this.jwtFilter.decodeToken(this.token)
    const role = decodeToken.role
    if (role === 'ADMIN'){this.disable = false}else{this.disable = true}
  }
      logout() {
    localStorage.clear()
    this.router.navigate(['/signin'])
  }
}
