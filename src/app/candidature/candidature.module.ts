import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CandidatureRoutingModule } from './candidature-routing.module';
import { ListCandidatureComponent } from './list-candidature/list-candidature.component';
import { DialogCandidatureComponent } from './dialog-candidature/dialog-candidature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { ServiceCandidatureService } from '../service/service-candidature.service';
import {CandidatureComponent} from './candidature.component';

@NgModule({
  declarations: [
    CandidatureComponent,
    ListCandidatureComponent,
    DialogCandidatureComponent,
  ],
  imports: [
    CommonModule,
    CandidatureRoutingModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ]
})
export class CandidatureModule { }
