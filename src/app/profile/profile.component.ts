import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

declare var window: any

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http : HttpClient,private userService:UserService,private jwtHelper:JwtHelperService) { }
  jsonData: any

  hidePassword = true;

  oldPassword!: string
  newPassword!: string
  confirmPassword!: string
  

  ngOnInit(): void {
    const token: any = localStorage.getItem('token')
    const decodeToken = this.jwtHelper.decodeToken(token)
    const id = decodeToken.userId
    this.userService.getUserById(id).subscribe((response: any) => {
      this.jsonData = response

    }, (error) => {
      if (error.error) {
        alert(error.error)
      }
    })
  }
  changePass() {
    const data = {
    "oldPassword": this.oldPassword,
    "newPassword" : this.newPassword
    }
    if (this.newPassword != this.confirmPassword) {
      Swal.fire(
          'Bad Request',
          'Password don\'t match',
          'error'
      )
    }
    else {
          this.userService.changePassword(data).subscribe((response: any) => {
            Swal.fire(
              response.message,
              '',
          'success'
      )
    }, (error) => {
            if (error.error?.message) {
              Swal.fire(
          'Bad Request',
          error.error.message,
          'error'
      )
      }
    })
    }

  }

}
