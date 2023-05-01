import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  jsonData: any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: any) => {
      console.log(response)
      this.jsonData = response
    }, (error) => {
      if (error.error) {
        Swal.fire(
          'unauthorized',
          'ridh w sayeb aliik',
          'error'
         )
      }
    });
    
  }
  avtivateAccount(id: string) {
    const data = {
      'userId': id,
      'status' : 'true'
    }
    this.userService.activateAccount(data).subscribe((response: any) => {
      console.log(response.message)
              Swal.fire(
          'Administration',
           response.message,
          'success'
         )
      location.reload();
    }, (error) => {
      if (error.error?.message) {
        Swal.fire(
          'Administration',
           error.error.message,
          'error'
         )
      }
    })
  }
  bannAccount(id: string) {
        const data = {
      'userId': id,
      'status' : 'false'
        }
    this.userService.activateAccount(data).subscribe((response: any) => {
      console.log(response.message)
              Swal.fire(
          'Administration',
           response.message,
          'success'
         )
      location.reload();
    }, (error) => {
      if (error.error?.message) {
        Swal.fire(
          'Administration',
           error.error.message,
          'error'
         )
      }
    })
  }

}
