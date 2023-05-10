import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours } from '../model/cours';
import { Quiz } from '../model/quiz';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css'
 
    
  ,'../../assetsf/css/style.css','../../assetsf/lib/owlcarousel/assets/owl.carousel.min.css']
})
export class CoursComponent implements OnInit {
 
  
  formationId!: number;
  p: number=0
  screenWidth = 0; ///
  isSideNavCollapsed = false;
  cours:Cours[]=[]
  quiz: Quiz = new Quiz;
  usersession:any;
  quiz1: Quiz = new Quiz;
  x:String="Technitial_MEMBER"
  q!:number
  a!: string
   b!: string
    c!: string
    d!: string
    e!: string
    f!: string
     
  constructor(private route: ActivatedRoute,private http: HttpClient,private jwtHelper: JwtHelperService) { }

  decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') || '');
  userid = this.decodedToken.userId;




  ngOnInit(): void {




    this.http.get<any>(`http://52.226.233.18:8082/user/get/${this.userid}`,
    
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













///get cours by id

    this.route.params.subscribe(params => {
      this.formationId = +params['idf']; // Retrieve the 'id' parameter from the URL and convert it to a number
      console.log(this.formationId)
    });
    
    this.http.get<Cours[]>(`http://52.226.233.18:8082/formation/cours/${this.formationId}`,
  
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    })

    .subscribe((data: Cours[]) => {
      this.cours = data;
      console.log(this.cours)
    });
  }

  
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }

//////get quiz



      getquiz(formationId: number) {
        this.http.get<Quiz>(`http://52.226.233.18:8082/${this.formationId}/quiz/`,

        {
          headers: new HttpHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          })
        })
    
        .subscribe((data: Quiz) => {
          this.quiz = data;
        
        });
      }

     
  
/////// submit quiz

      submitQuiz( a: string, b: string, c: string, d: string, e: string, f: string) {
        console.log(a, b, c, d, e, f);
      
        let p = 0;
      
        if (a === this.quiz.rv1) {
          p++;
        }
      
        if (b === this.quiz.rv2) {
          p++;
        }
      
        if (c === this.quiz.rv3) {
          p++;
        }
      
        if (d === this.quiz.rv4) {
          p++;
        }
      
        if (e === this.quiz.rv5) {
          p++;
        }
      
        if (f === this.quiz.rv6) {
          p++;
        }
      
       
      
        console.log(p);
      
        if (p >= 3) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Succeeded',
            text: 'Congratulations, you have done a good job',
            showConfirmButton: false,
            timer: 1500
          });
         
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Try to work hard next time'
          });
        }
      
     return p
  

      }






      
      rr(p:number){

   
        const quizScore = this.submitQuiz(this.a, this.b, this.c, this.d, this.e, this.f);
           const headers = new HttpHeaders({
             'Authorization': 'Bearer ' + localStorage.getItem('token')
           });
         
           this.http.post('http://52.226.233.18:8082/noteF?noteF=' +quizScore, {}, { headers: headers }).subscribe(() => {
             console.log('Note saved successfully');
             
           }, error => {
             console.error('Error saving note:', error);
           });
         
       
       }




    

//delete quiz
   
// delete_q(id: number) {


//   console.log(id)
//   const headers = new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   });

//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.http.post('http://52.226.233.18:8082/delete_q?idf=' + id, {}, { headers: headers }).subscribe(() => {
//         console.log('Post deleted successfully');
//         Swal.fire(
//           'Deleted!',
//           'Your post has been deleted.',
//           'success'
//         )
//       }, error => {
//         console.error('Error deleting post:', error);
//       });
//     }
//   });
// }




////////POST Quiz ///////



onAddQ(formationIdLong: number) {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  const url = `http://52.226.233.18:8082/add/quiz/${formationIdLong}`;
  this.http.post(url, this.quiz, { headers: headers })
    .subscribe(response => {
      this.quiz=new Quiz
      console.log('Quiz added successfully:', response);
      Swal.fire(
                  
                  'Your Quiz has been added.',
                  'success'
                )
    }, error => {
      console.error('Error adding quiz:', error);
    });
}


///// lien de pdf 

   
openPDF(pdfUrl: string): void {
  const fullUrl = `http://52.226.233.18:4200/member/main/${pdfUrl}`;
  window.open(fullUrl, '_blank');
}





  

} 



      










  
    




