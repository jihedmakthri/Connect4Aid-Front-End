import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  jsonData: any;
  newRole!: string;
  currentId!: string;
  charts: any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response: any) => {
      console.log(response)
      this.jsonData = response
      this.chart();
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
  chart() {
    console.log(this.jsonData)
    const nbrAdmin = this.jsonData.filter((user:any) => user.role === 'ADMIN').length;
    const nbrUser = this.jsonData.filter((user: any) => user.role === 'USER').length;
    const nbrPresident_MEMBER = this.jsonData.filter((user: any) => user.role === 'President_MEMBER').length;
    const nbrActive_MEMBER = this.jsonData.filter((user: any) => user.role === 'Active_MEMBER').length;
    const nbrFormer_MEMBER = this.jsonData.filter((user: any) => user.role === 'Former_MEMBER').length;
    const nbrOrganizer_MEMBER = this.jsonData.filter((user: any) => user.role === 'Organizer_MEMBER').length;
    const nbrRightHand_MEMBER = this.jsonData.filter((user: any) => user.role === 'RightHand_MEMBER').length;
    const nbrWriter_MEMBER = this.jsonData.filter((user: any) => user.role === 'Writer_MEMBER').length;
    const nbrLeader_MEMBER = this.jsonData.filter((user: any) => user.role === 'Leader_MEMBER').length;
    const nbrHelper_MEMBER = this.jsonData.filter((user: any) => user.role === 'Helper_MEMBER').length;
    const nbrTechnitial_MEMBER = this.jsonData.filter((user: any) => user.role === 'Technitial_MEMBER').length;

    
    const labels = ['admins', 'users', 'President MEMBER','Active MEMBER','Former MEMBER','Organizer_MEMBER','RightHand_MEMBER','Writer_MEMBER','Leader_MEMBER','Helper_MEMBER','Technitial_MEMBER']
    const ch = new Chart('mychart', {
    type:'bar',
      data: {
  labels: labels,
  datasets: [{
    label: 'Users per role',
    data: [nbrAdmin,nbrUser,nbrPresident_MEMBER,nbrActive_MEMBER,nbrFormer_MEMBER,nbrOrganizer_MEMBER,nbrRightHand_MEMBER,nbrWriter_MEMBER,nbrLeader_MEMBER,nbrHelper_MEMBER,nbrTechnitial_MEMBER],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
    }
    })
    
  }
}
