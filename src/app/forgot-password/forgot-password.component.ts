import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email!: string;
  message!: any;
  constructor(
    private userService: UserService,private router: Router,private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
        let token;
    token = localStorage.getItem('token')
    if(token != null )
    {
      if (this.jwtHelper.decodeToken(token).role === 'USER') { this.router.navigateByUrl('/user/main') }
      else if (this.jwtHelper.decodeToken(token).role === 'ADMIN') { this.router.navigateByUrl('/dashboard') }
      else { this.router.navigateByUrl('/member/main') }
    }
  }

  forgotPassword() {
    let data = {
      "email": this.email
    }
    this.userService.forgotPassword(data).subscribe(
      (response: any) => { 
      Swal.fire(
          'Connec4Aid',
          response.message,
          'success'
        )
      this.router.navigate(['/signin'])
      }, (error) => {
        if (error.error?.message) {
         Swal.fire(
          'Connect4Aid',
           error.error.message,
          'error'
        )
        }
     })
    
  }

}
