import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { AdminGuard } from './service/admin.guard';
import { UserGuard } from './service/user.guard';
import { MemberGuard } from './service/member.guard';
import { BodyComponent } from './body/body.component';
import { OutletComponent } from './outlet/outlet.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard], children: [
    {path: 'test',component:TestComponent}
  ]},
  { path: 'user/main', component: UserPageComponent, canActivate: [UserGuard] },
  { path: 'member/main', component: MemberPageComponent, canActivate: [MemberGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
