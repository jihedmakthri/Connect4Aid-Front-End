import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css','../../assets/charity/css/animate.css', '../../assets/charity/css/bootstrap.css',
    '../../assets/charity/css/icomoon.css',
    '../../assets/charity/css/style.css',
    '../../assets/charity/css/superfish.css']
})
export class ContactComponent implements OnInit {

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
