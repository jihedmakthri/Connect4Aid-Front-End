import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatureComponent } from './candidature.component';
import { ListCandidatureComponent } from './list-candidature/list-candidature.component';
const routes: Routes = [
  {path:"listCandidature",component: ListCandidatureComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatureRoutingModule { }
