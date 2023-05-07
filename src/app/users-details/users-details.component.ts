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
  newRole!: string;
  currentId!: string;
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
      setTimeout(this.reloadPage, 2000);
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

         Swal.fire(
          'Administration',
           response.message,
          'success'
         )
      setTimeout(this.reloadPage, 2000);
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
  takeCurrentId(userId: string) {
    this.currentId = userId
  }
  changeRole() {
    const data = {
      "userId": this.currentId,
      "role" : this.newRole
    }
      let timerInterval : any
        Swal.fire({
          title: 'Changing Role',
          html: '<h2>Loading</h2> ... <br>please Wait',
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b:any = Swal.getHtmlContainer()?.querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
})

    this.userService.changeRole(data).subscribe((response: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })
      location.reload();
    }, (error) => {
        if (error.error?.message) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
  reloadPage(): void {
  location.reload();
}
  deleteAccount(id:string) {
    this.userService.deleteAccount(id).subscribe((response: any) => {
        Swal.fire(
          'Administration',
           response.message,
          'success'
        )
    setTimeout(this.reloadPage, 2000);
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
