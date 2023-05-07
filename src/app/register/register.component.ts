import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  hidePassword = true;

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
  parseDateString(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  const formattedMonth = month.padStart(2, '0');
  return `${year}-${formattedMonth}-${day}`;
}
  userRegister() {
    const date = this.user.dateOfBirth.year + '-' + this.user.dateOfBirth.month + '-' + this.user.dateOfBirth.day
    this.user.dateOfBirth = this.parseDateString(date);
    const numb = this.user.contactNumber.toString();
    this.user.contactNumber = numb;
    console.log(this.user);
    if (this.user.password == this.user.confirmPassword) {
      this.userService.signUp(this.user).subscribe(
        (response: any) => {
        Swal.fire(
           response.message,
          'Welcome To Connect4Aid',
          'success'
        )
        this.router.navigate(['/signin'])
      },
        (error) => {
          if (error.error?.message) {
             Swal.fire(
               error.error.message,
               'check your inputs',
                'error'
              )
        }
      })
      
    } else {
      
      Swal.fire('password don\'t match')
      
    }

  }
}
