import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formation } from '../model/Formation';
import Swal from 'sweetalert2';
import { typeF } from '../model/typef';
import { JwtHelperService } from '@auth0/angular-jwt';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'
    ,'../../assetsf/css/style.css'
    ,'../../assetsf/lib/owlcarousel/assets/owl.carousel.min.css']
})
export class FormationComponent implements OnInit {

  isFormVisible = false;
  isSideNavCollapsed = false;
  screenWidth = 0;
  formation:Formation[]=[]
  


/// POST formation 

title!: string;
dateDebut!: string;
image!: File;
dateFin!: string;
typeF!: string;
place!: string;
owner!: string;
description!: string;

idz!:any;
list:typeF[]=[]
 
x:String="ADMIN"


usersession:any;
  
  constructor(private http: HttpClient,public router: Router,private jwtHelper: JwtHelperService) { }
  

  decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') || '');
  userid = this.decodedToken.userId;

////////   Get      formation ////////

  ngOnInit(): void {

/////

this.http.get<any>('http://52.226.233.18:8082/usernotee', {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
}).subscribe((result: any) => {
  Swal.fire({
    title: 'User with most notes',
    text: 'The user with the most notes is: ' + result.firstName + ' with ' + result.noteF + ' notes.',
    icon: 'info'
   
  });
}, (error) => {
  console.log('Error getting user with most notes:', error);
});

////

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



    
//////////// get all types

    this.http.get<typeF[]>(' http://52.226.233.18:8082/types',
    
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    })


    .subscribe((data: typeF[]) => {
      this.list = data;
    });

////////////
  
/////// get all formation
    this.http.get<Formation[]>('http://52.226.233.18:8082/formation',
    
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    })


    .subscribe((data: Formation[]) => {
      this.formation = data;
    });
  }
  

  ///////
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    }
   

    ////////POST ///////

    onSubmit(   ) {
      const formData = new FormData();
      formData.append('title',this.title);
      formData.append('image',this.image as File);
      formData.append('dateDebut', this.dateDebut);
      formData.append('owner', this.owner);
      formData.append('dateFin', this.dateFin);
      formData.append('place', this.place);
      formData.append('description', this.description);
      formData.append('typeF', this.typeF);
      console.log(formData);
      this.http.post<Formation>('http://52.226.233.18:8082/formation', formData, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })

      }).subscribe(data => { 
        
        console.log(data)
        /////bech yarja3 champ fera8
        this.formation.unshift(data);
        this.title = '';
        this.dateDebut = '';
        this.dateFin = '';
        this.place = '';
        this.owner = '';
        this.description = '';
      


      });
    }

    onOptionSelected(event: any) {
      this.typeF = event.target.value;
     
    }
////////





      gotoFormationDetails(formationId: number) {
      // Navigate to the FormationDetailsComponent with the formationId as a route parameter
      this.router.navigate(['member/main/formation/cour/', formationId]);
    }


 

   
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.image = file;
    }





//delete formation
   
delete(id: number) {
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
      this.http.post('http://52.226.233.18:8082/delete?idf=' + id, {}, { headers: headers }).subscribe(() => {
        console.log('Post deleted successfully');
        this.formation = this.formation.filter(x => x.idf !== id);
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
   



//update formation 

 update(id: number) {
  
  const formData = new FormData();
      formData.append('title',this.title);
      formData.append('image',this.image as File);
      formData.append('dateDebut', this.dateDebut);
      formData.append('owner', this.owner);
      // formData.append('typeF', this.typeF);
      formData.append('place', this.place);
      formData.append('description', this.description);
  
  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  
   
      this.http.post(`http://52.226.233.18:8082/updatef/${id}` , formData, { headers: headers }).subscribe(() => {
        console.log(this.http)
        this.title = '';
        this.dateDebut = '';
        this.dateFin = '';
        this.owner = '';
         this.place = '';
        //   this.typeF = '';
        this.description = '';
   
      }, 
      
    )}


    getbytypeforamtion( t :typeF){

      this.http.get<Formation[]>('http://52.226.233.18:8082/for?t='+t,
    
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      })
    })

    .subscribe((data: Formation[]) => {
      this.formation = data;
    });
  



    }

}

      //this.formation = this.formation.map(f => f.idf === id ? data : f); // update the modified post
  

  
    
  


    


    




