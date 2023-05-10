import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ServiceCandidatureService } from 'src/app/service/service-candidature.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-candidature',
  templateUrl: './dialog-candidature.component.html',
  styleUrls: ['./dialog-candidature.component.css']
})
export class DialogCandidatureComponent implements OnInit {
  candidatureForm !: FormGroup;
  actionButton: string = "Ajouter";
 

  constructor(private formBuilder: FormBuilder, private candidatureService: ServiceCandidatureService,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private matdialoRef: MatDialogRef<DialogCandidatureComponent>) {}

  ngOnInit(): void {
    this.candidatureForm=this.formBuilder.group({
      enumEtat: ['', Validators.required],
      enumPost: ['', Validators.required],
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      cv: ['', Validators.required],
    });

    if (this.editdata) {
      this.actionButton = "Modifier";
      this.candidatureForm.controls['enumEtat'].setValue(this.editdata.enumEtat);
      this.candidatureForm.controls['enumPost'].setValue(this.editdata.enumPost);
      this.candidatureForm.controls['firstName'].setValue(this.editdata.firstName);
      this.candidatureForm.controls['lastname'].setValue(this.editdata.lastname);
      this.candidatureForm.controls['email'].setValue(this.editdata.email);
      this.candidatureForm.controls['mobile'].setValue(this.editdata.mobile);
      this.candidatureForm.controls['cv'].setValue(this.editdata.cv);
    }
  }
  

  addCandidature() {
    console.log(this.candidatureForm.value);

    if (!this.editdata) {
      if (this.candidatureForm.valid) {
        this.candidatureService.postCandidature(this.candidatureForm.value)
        .subscribe({
          next: (res) => {
            alert("candidature ajoute avec succes");
            this.candidatureForm.reset();
            this.matdialoRef.close("ajout");
          },
          error: () => {
            alert("erreur d'ajout");
          }
        });
      }
    } else {
      this.updateCandidature();
    }
  }

  updateCandidature() {
    this.candidatureService.updateCandidature(this.candidatureForm.value, this.editdata.idCondidate)
    .subscribe({
      next: (r) => {
        alert("candidature bien modifiée");
        this.candidatureForm.reset();
        this.matdialoRef.close('update');
      },
      error: () => {
        alert("error de modification");
      }
    });
  }
}
