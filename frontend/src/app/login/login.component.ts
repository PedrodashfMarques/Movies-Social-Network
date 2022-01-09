import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  errorMessage: string;

  mySubscription: Subscription;

  
  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router) { }

  ngOnInit(): void {
    this.loginUserForm();
  }

  loginUserForm(){
    this.loginForm = this.myFormBuilder.group({
      'email' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(252),
      ])],
      'password' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000),
      ])]
    })
  }


  submitLogin(values: any){
    let formData = new FormData();

    formData.append('email', values.email);
    formData.append('password', values.password);

    this.mySubscription = this.myAuthService.loginUser(formData).subscribe(response => {
      this.myRouter.navigate(['/newsfeed']);
    },
      error => {
        this.errorMessage = error;
      }
    ); 
  }
  
  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }

}
