import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email!: string;
  message!: any;
  constructor(
    private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    let data = {
      "email": this.email
    }
    this.userService.forgotPassword(data).subscribe(
      (response: any) => { 
      alert(response.message)
      this.router.navigate(['/signin'])
      }, (error) => {
        if (error.error?.message) {
          alert(error.error?.message)
        }
     })
    
  }

}
