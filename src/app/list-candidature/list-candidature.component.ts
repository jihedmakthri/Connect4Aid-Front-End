import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogCandidatureComponent } from '../dialog-candidature/dialog-candidature.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceCandidatureService } from 'src/app/service/service-candidature.service';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.css']
})
export class ListCandidatureComponent implements OnInit {
  displayedColumns: string[] = ['idCondidate','enumEtat','enumPost','firstName','lastname','email','mobile','cv','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private candidatureService:ServiceCandidatureService) {}

    openDialog() {
      this.dialog.open(DialogCandidatureComponent, {
      width:'30%'
  
      }).afterClosed().subscribe(val=>{
      if(val==='ajout'){
      this.getAllCandidatures()
      }
      });
      }
  

  ngOnInit(): void {
    this.getAllCandidatures()
  }

  nbr=0;
  getAllCandidatures(){
    this.candidatureService.getCandidature()
    .subscribe({
    next: (res)=>{
      this.nbr=res.length;// teb3a l'input property
    console.log(res);
    this.dataSource=new MatTableDataSource(res)
    console.log("heeeelooo");


    },
    error:()=>{
    alert("erreur get all")}})
      }



    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
    }



      editCandidature(row :any) {
      this.dialog.open(DialogCandidatureComponent, {
      width:'30%',
      data:row

      }).afterClosed().subscribe(val=>{
      if(val==='update'){
      this.getAllCandidatures()
      }
      });;
      }







deleteCandidature(id: number){
  this.candidatureService.deleteCandidature(id).subscribe( data => {
    alert("Candidature bien supprimer")

    this.getAllCandidatures()


})}
exportExperienceExcel(){
  
    this.candidatureService.getCandidature().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/excel' });
      FileSaver.saveAs(blob, 'experiences.excel');
    });
  }
  exportExperience() {
    this.candidatureService.getCandidature().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const headers = new HttpHeaders({
        'Content-Type': 'application/pdf',
      });
      const options = { headers };
      const file = new File([blob], 'experiences.pdf', { type: 'application/pdf' });
      FileSaver.saveAs(file);
    });
  }
}












