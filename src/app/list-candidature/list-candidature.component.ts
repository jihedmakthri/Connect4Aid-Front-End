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
      const dialogRef = this.dialog.open(DialogCandidatureComponent, {
        width: '60%',
        position: {
          top: '50px',
          right: '50px'
        }
      });
      dialogRef.afterClosed().subscribe(val => {
        if (val === 'ajout') {
          this.getAllCandidatures();
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
      width:'60%',
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
  this.candidatureService.exportExcelCandidatures().subscribe(x => {
    const blob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const n = (window.navigator as any);
if (n.msSaveOrOpenBlob) {
n.msSaveOrOpenBlob(blob);
return;
}
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = data;
    link.download="experience.xlsx";
    link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

    setTimeout(function() {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
});

}

exportExperience(){
  this.candidatureService.exportPdfCandidatures().subscribe(x => {
    const blob = new Blob([x], { type: 'application/pdf' });
    const url= window.URL.createObjectURL(blob);
    const nav = (window.navigator as any);
if (nav.msSaveOrOpenBlob) {
  nav.msSaveOrOpenBlob(blob);
  return;
}

  const data = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href= data;
  link.download="experience.pdf";
  link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

  setTimeout(function() {
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
});

  }
}












