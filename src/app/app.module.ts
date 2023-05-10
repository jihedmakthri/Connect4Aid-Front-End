import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserPageComponent } from './user-page/user-page.component';
import { MemberPageComponent } from './member-page/member-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { OutletComponent } from './outlet/outlet.component';
import { NavbarAppComponent } from './navbar-app/navbar-app.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './test/test.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { BlogComponent } from './blog/blog.component';
import { EventviewComponent } from './eventview/eventview.component';
import { FormationComponent } from './formation/formation.component';
import { CoursComponent } from './cours/cours.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDashComponent } from './event-dash/event-dash.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventstatComponent } from './eventstat/eventstat.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ListCandidatureComponent } from './list-candidature/list-candidature.component';
import { ListentretienComponent } from './list-entretien/list-entretien.component';
import { DialogCandidatureComponent } from './dialog-candidature/dialog-candidature.component';
import { EntretienDialogComponent } from './entretien-dialog/entretien-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';


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
    BlogComponent,
    EventviewComponent,
    EventDashComponent,
    EventstatComponent,
    AboutComponent,
    ContactComponent,
    CoursComponent,
    CoursComponent,
    FormationComponent,
    ListCandidatureComponent,
    ListentretienComponent,
    DialogCandidatureComponent,
    EntretienDialogComponent,
    FormationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxExtendedPdfViewerModule,
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
  bootstrap: [AppComponent],
})
export class AppModule {}
