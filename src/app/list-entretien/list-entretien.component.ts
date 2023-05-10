import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EntretienDialogComponent } from '../entretien-dialog/entretien-dialog.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EntretienService } from 'src/app/service/entretien.service';

@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.css']
})
export class ListentretienComponent implements OnInit {
  displayedColumns: string[] = ['idEntretien','lieu','date','description','actions'];
  dataSource!: MatTableDataSource<any>;
  isSideNavCollapsed = false;
  screenWidth = 0;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private EntretienService :EntretienService) {}
    openDialog() {
      this.dialog.open(EntretienDialogComponent, {
      width:'30%'
  
      }).afterClosed().subscribe(val=>{
      if(val==='ajout'){
      this.getAllentretiens()
      }
      });
      }
  

  ngOnInit(): void {
    this.getAllentretiens()
  }

  nbr=0;
  getAllentretiens(){
    this.EntretienService.getentretien()
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



      editentretien(row :any) {
      this.dialog.open(EntretienDialogComponent, {
      width:'30%',
      data:row

      }).afterClosed().subscribe(val=>{
      if(val==='update'){
      this.getAllentretiens()
      }
      });;
      }







deleteentretien(id: number){
  this.EntretienService.deleteentretien(id).subscribe( data => {
    alert("entretien bien supprimer")

    this.getAllentretiens()


})
}








}
