import { Component, Input, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,private router: Router,private jwtHelper: JwtHelperService) { }

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
  userRegister() {
    const date = this.user.dateOfBirth.year + '-' + this.user.dateOfBirth.month + '-' + this.user.dateOfBirth.day
    this.user.dateOfBirth = date;
    const numb = this.user.contactNumber.toString();
    this.user.contactNumber = numb;
    console.log(this.user);
    if (this.user.password == this.user.confirmPassword) {
      this.userService.signUp(this.user).subscribe(
        (response: any) => {
        alert(response.message)
        this.router.navigate(['/signin'])
      },
        (error) => {
          if (error.error?.message) {
          alert(error.error.message)
        }
      })
      
    } else {
      alert("password don't match");
      
    }

  }
}
