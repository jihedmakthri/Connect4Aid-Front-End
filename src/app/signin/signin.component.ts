
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginInfo: Login = new Login();

  constructor(private userService: UserService, private router:Router,private jwtHelper: JwtHelperService) { }

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

  login() {
    this.userService.login(this.loginInfo).subscribe(
      (response: any) => {
        Swal.fire(
          'Signed In!',
          'Welcome To Connect4Aid',
          'success'
        )
        localStorage.setItem('token', response.token)
        const decodedToken = this.jwtHelper.decodeToken(response.token);
        const role = decodedToken.role;
        if (role == 'ADMIN') {
          this.router.navigate(['/admin'])
        }
        else if (role == 'USER') {
          this.router.navigate(['/user/main'])
        }
        else {
          this.router.navigate(['/member/main'])
        }
      },
        (error) => {
          if (error.error?.message) {
            console.log(error.error.message)
            Swal.fire(
               error.error.message,
              'Incorrect Email or Password ...',
              'error'
            )
        }
      })
  }
}
