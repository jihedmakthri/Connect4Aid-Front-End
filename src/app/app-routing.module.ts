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
import { UsersDetailsComponent } from './users-details/users-details.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import {CreateComponent} from "./donation/create/create.component";
import {PaymentCreateComponent} from "./payment/payment-create/payment-create.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'test',component:TestComponent},
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  {
    path: 'admin', component: DashboardComponent, children: [
      { path: 'usersDetails', component: UsersDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      {path:'dashboard',component:DashboardMainComponent},
  ]},
  {
    path: 'user/main', component: UserPageComponent, children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'donation', component: CreateComponent },
          { path: 'payment', component: PaymentCreateComponent },
  ]},
  { path: 'member/main', component: MemberPageComponent, canActivate: [MemberGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
