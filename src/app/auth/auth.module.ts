import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './components/confirm-email/confirm-password.component';
import { RenewPasswordComponent } from './components/renew-password/renew-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GoogleCallbackComponent } from './components/google-callback/google-callback.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    RenewPasswordComponent,
    GoogleCallbackComponent
  ],
  providers: [CookieService],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  exports:[ 
     LoginComponent,
     RegisterComponent ,
     ForgotPasswordComponent,
     ConfirmPasswordComponent,
     RenewPasswordComponent,
     FormsModule,
     ReactiveFormsModule

    ]

})
export class AuthModule { }
