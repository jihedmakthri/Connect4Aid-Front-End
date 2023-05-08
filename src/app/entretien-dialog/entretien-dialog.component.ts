import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidature } from 'src/app/model/Candidature';
import { EntretienService } from 'src/app/service/entretien.service';
import { ServiceCandidatureService } from 'src/app/service/service-candidature.service';


@Component({
  selector: 'app-entretien-dialog',
  templateUrl: './entretien-dialog.component.html',
  styleUrls: ['./entretien-dialog.component.css']
})
export class EntretienDialogComponent implements OnInit {
  
  entretienForm !: FormGroup
  actionButton:string="Ajouter"
  candidates: Candidature[] = [];
  idCandidate:number=0;
  constructor(private formBuilder : FormBuilder , private entretienservice:EntretienService,private candidatureService:ServiceCandidatureService,
    @Inject(MAT_DIALOG_DATA) public editdata:any,
    private matdialoRef  :MatDialogRef<EntretienDialogComponent>) { }
    

  ngOnInit(): void {
    this.findAllCandidatesNotAssign();
   
    this.entretienForm=this.formBuilder.group({

     lieu :['',Validators.required ],
     date :['',Validators.required ],
     description :['',Validators.required ],
    })

    
    console.log(this.editdata)

    if(this.editdata){
      this.actionButton="Modifier"
      this.entretienForm.controls['lieu'].setValue(this.editdata.lieu)
      this.entretienForm.controls['date'].setValue(this.editdata.date)
      this.entretienForm.controls['description'].setValue(this.editdata.description)
    }
  }
  

  addEntretien(){

    console.log(this.entretienForm.value)

    if(!this.editdata){
      if(this.entretienForm.valid){
        this.entretienservice.getentretien()
        .subscribe({
          next: (res)=>{
            alert("entretien ajoute avec succes");
            this.entretienForm.reset();
            this.matdialoRef.close("ajout");
          },
          error:()=>{
            alert("erreur d'ajout")
          }


        })
      }
    }else{
      this.updateEntretien()
    }

  }


  updateEntretien(){

    this.entretienservice.updateentretien(this.entretienForm.value,this.editdata.idCondidate)
    .subscribe({
      next:(r)=>{
        alert("entretien bien modifiée")
        this.entretienForm.reset()
        this.matdialoRef.close('update')
      },
      error:()=>{
        alert("error de modification")
      }
    })




  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    
  }
  onCandidateSelect(event: any) {
    this.idCandidate = event.target.value;
  }
  
  assignEntToCand(){
    this.entretienservice.assignEntToCand(this.entretienForm.value, this.idCandidate)
    .subscribe({
      
        next: (res)=>{
          alert("candidature ajoute avec succes");
          this.entretienForm.reset();
          this.matdialoRef.close("ajout");
        },
        error:()=>{
          alert("erreur d'ajout")
        }}
    );
}
    
      
findAllCandidatesNotAssign(){
  this.entretienservice.findAllCandidatesNotAssign()
      .subscribe((candidates: Candidature[]) => this.candidates = candidates);
  }
}

