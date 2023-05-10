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
import { EventDashComponent } from './event-dash/event-dash.component';
import { EventviewComponent } from './eventview/eventview.component';
import { EventstatComponent } from './eventstat/eventstat.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormationComponent } from './formation/formation.component';
import { CoursComponent } from './cours/cours.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact',component:ContactComponent},
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'blog', component: BlogComponent },
      { path: 'usersDetails', component: UsersDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'dashboard', component: DashboardMainComponent },
      { path: 'EventDash', component: EventDashComponent },
      { path: 'event/:id', component: EventviewComponent },
      { path: 'eventstat', component: EventstatComponent },
    ],
  },
  {
    path: 'user/main',
    component: UserPageComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'blog', component: BlogComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'user/main', component: UserPageComponent, canActivate: [UserGuard], children: [
          { path: 'profile', component: ProfileComponent },
  ]},
  { path: 'member/main', component: MemberPageComponent, canActivate: [MemberGuard],children:[
    { path: 'formation', component: FormationComponent,canActivate: [MemberGuard] },
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'blog', component: BlogComponent },
    { path: 'EventDash', component: EventDashComponent },
    { path: 'event/:id', component: EventviewComponent },] },
      { path: 'eventstat', component: EventstatComponent },
  
  { path: 'member/main/formation/cour/:idf', component: CoursComponent,canActivate: [MemberGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
