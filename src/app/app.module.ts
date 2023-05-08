import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserPageComponent } from './user-page/user-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import {MatButtonModule} from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { OutletComponent } from './outlet/outlet.component';
import { NavbarAppComponent } from './navbar-app/navbar-app.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { CandidatureModule } from './candidature/candidature.module';
import { ListCandidatureComponent } from './list-candidature/list-candidature.component';
import { DialogCandidatureComponent } from './dialog-candidature/dialog-candidature.component';
import {ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    SigninComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UserPageComponent,
    MemberPageComponent,
    SidenavComponent,
    BodyComponent,
    OutletComponent,
    NavbarAppComponent,
    UsersDetailsComponent,
    ProfileComponent,
    TestComponent,
    DashboardMainComponent,
    ListCandidatureComponent,
    DialogCandidatureComponent
  ],
  imports: [
    BrowserModule,
    CandidatureModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost'],
        
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
