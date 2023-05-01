import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService,private router:Router) { }

  ngOnInit(): void {
            let token;
    token = localStorage.getItem('token')
    if(token != null )
    {
      if (this.jwtHelper.decodeToken(token).role === 'USER') { this.router.navigateByUrl('/user/main') }
      else if (this.jwtHelper.decodeToken(token).role === 'ADMIN') { this.router.navigateByUrl('/admin') }
      else { this.router.navigateByUrl('/member/main') }
    }
  }

}
