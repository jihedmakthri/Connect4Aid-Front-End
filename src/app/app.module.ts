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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { CreateComponent } from './donation/create/create.component';
import { IndexComponent } from './donation/index/index.component';
import { ViewComponent } from './donation/view/view.component';
import { PaymentCreateComponent } from './payment/payment-create/payment-create.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MatTableModule} from '@angular/material/table';
import { ListPaymentComponent } from './payment/list-payment/list-payment.component';

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
    CreateComponent,
    IndexComponent,
    ViewComponent,
    PaymentCreateComponent,
    ListPaymentComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                },
                allowedDomains: ['localhost'],

            },
        }),
        ReactiveFormsModule,
      MatInputModule,
      MatSelectModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      MatTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
