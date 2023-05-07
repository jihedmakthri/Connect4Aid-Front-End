import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Publication} from "../model/publication";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Comment } from '../model/Comment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css','./../../assets/css/style.css', './../../assets/css/animate.css'
  ,'./../../assets/css/bootstrap.min.css','./../../assets/css/line-awesome.css',
  './../../assets/css/responsive.css',' ../../../../assets/lib/slick/slick-theme.css',' ../../../../assets/lib/slick/slick.css',
  './../../assets/css/line-awesome-font-awesome.min.css','./../../assets/css/font-awesome.min.css']
})
export class MemberPageComponent implements OnInit {
  
    isSideNavCollapsed = false;
   
usersession!: any
bodye!:string
body!:string
    image!: File
    comment = new Comment();
    comments: Comment[] = [];
    point! :number
    bodyc!: string
    hidePoints! :boolean
  screenWidth = 0;
  publications:Publication[]=[]

  publications_sorted:Publication[]=[]
  decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') || '');
  userid = this.decodedToken.userId;
  constructor(private http: HttpClient,public router: Router,  private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
   
    
  //get the all user info
    this.http.get<any>(`http://localhost:8082/user/get/${this.userid}`,
    
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    }).subscribe(
      response => {
        this.usersession = response;
      
      },
      error => console.log(error)
    );

//get all the pub+coment
    
    this.http.get<Publication[]>('http://localhost:8082/pub', {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    })
    .subscribe((data: Publication[]) => {
      this.publications = data;
    
console.log( this.publications)

    });
  }

  //deconex
  logout() {
    localStorage.clear()
    this.router.navigate(['/signin'])
  }


  //sidnave
          onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }


//add post
/*
onSubmit() {
  const formData = new FormData();
  formData.append('image', this.image as File);
  if(this.body!=null){
  formData.append('body', this.body);
  }
  this.http.post<Publication>('http://localhost:8082/pub', formData, {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }).subscribe(data => {
    this.publications.unshift(data);
    this.body = '';
   
    
  });
}
*/

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  this.image = file;
}

    getmypoint(): void {

      this.http.get<number>('http://localhost:8082/pub/point', {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        })
      }) 
      
      
      .subscribe(points => {
        
        this.point = points;
      });
    }


    sort(): void {
      this.http.get<Publication[]>('http://localhost:8082/pub/sort', {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
        })
      })
      .subscribe((data: Publication[]) => {
        this.publications = data;
      });


}



addCommentToPublication(publicationId: number) {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  this.http.post<Comment>(`http://localhost:8082/com/${publicationId}`, this.comment, { headers: headers })
    .subscribe((response: Comment) => {
      // Find the publication that the comment belongs to
      const publication = this.publications.find(p => p.id === publicationId);
      if (publication) {
        // Add the new comment to the publication's comments array
        publication.comments.push(response);
      }
      this.comment = new Comment(); // Clear the input field after adding a comment
    });
}

async onSubmit() {



  const { value } = await Swal.fire({
    title: 'Create Publication',
    html: `
      <input type="text" id="swal-input1" class="form-control mb-3" placeholder="Enter body" autofocus>
      <input type="file" id="swal-input2" class="form-control mb-3">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const body = (document.getElementById('swal-input1') as HTMLInputElement)?.value;
      const image = (document.getElementById('swal-input2') as HTMLInputElement)?.files?.[0];
      return { body, image };
    }
  });
  
  
  if (value) {

    const formData = new FormData();
    formData.append('body',value.body);
    if(value.image){
    formData.append('image',value.image);
    }

  
    this.http.post<Publication>('http://localhost:8082/pub',  formData , {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
      
    }).subscribe(data => {
      if (data) {
        this.publications.unshift(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your post has been saved',
          showConfirmButton: false,
          timer: 1000
        })
      } 
      else 
      
      {
        Swal.fire({
          title: 'Bad word !',
          html: 'bad word detected you will be banned for 2 hours',
          timer: 2000,
          timerProgressBar: true,
    
          willClose: () => {
            clearInterval(5000)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })

        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['/signin']);
        }, 6000);


      }
    });
  }

 

}



//////delete post import Swal from 'sweetalert2';

deletePost(id: number) {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.post('http://localhost:8082/pub/delete?id=' + id, {}, { headers: headers }).subscribe(() => {
        console.log('Post deleted successfully');
        this.publications = this.publications.filter(pub => pub.id !== id);
        Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        )
      }, error => {
        console.error('Error deleting post:', error);
      });
    }
  });
}




async updatepost(id: number) {
  const { value } = await Swal.fire({
    title: 'Create Publication',
    html: `
      <input type="text" id="swal-input3" class="form-control mb-3" placeholder="Enter body" autofocus>
      <input type="file" id="swal-input4" class="form-control mb-3">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const body = (document.getElementById('swal-input3') as HTMLInputElement)?.value;
      const image = (document.getElementById('swal-input4') as HTMLInputElement)?.files?.[0];
      return { body, image };
    }
  });
  
  if (value) {
    const formData = new FormData();
    formData.append('body', value.body);
    if (value.image) {
      formData.append('image', value.image, value.image.name); // add the file with its name to the form data
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    this.http.post<Publication>(`http://localhost:8082/pub/modif/${id}`, formData, { headers }).subscribe(data => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your post has been saved',
        showConfirmButton: false,
        timer: 1000
      });
      this.publications = this.publications.map(pub => pub.id === id ? data : pub); // update the modified post
    }, error => {
      console.error('Error creating post:', error);
    });
  }
}



////////////traja3likk il date kif 12 h ago ..
getPublicationTimeAgo(created: Date) {
  return moment(created).fromNow();
}





}



























