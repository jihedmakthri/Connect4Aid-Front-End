
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginInfo: Login = new Login();

  constructor(private userService: UserService, private router:Router,private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.loginInfo).subscribe(
        (response: any) => {
        localStorage.setItem('token', response.token)
        const decodedToken = this.jwtHelper.decodeToken(response.token);
        const role = decodedToken.role;
        if (role == 'ADMIN') {
          this.router.navigate(['/dashboard'])
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
        }
      })
  }
}
