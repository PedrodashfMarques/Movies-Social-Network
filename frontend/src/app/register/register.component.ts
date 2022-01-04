import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { passwordMatch } from '../shared/PasswordMatch.validator';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  errorMessage: string;

  successMessage: string;

  constructor(
    private myFormBuilder: FormBuilder,
    private myAuthService: AuthService,
    private myRouter: Router
    ) { }
    
    
  ngOnInit(): void {
    this.createUserForm();
  }

  
  createUserForm(){
    this.registerForm = this.myFormBuilder.group({

      'firstName' : ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)])],
        'userName' : ['', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ])],
        'lastName' : ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ])],
        'email' : ['', Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(252),
        ])],
        'password' : ['', Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])],
        'confirmPassword' : ['', Validators.compose([
          Validators.required])]
    }, {
      validator: passwordMatch('password', 'confirmPassword')
    });
  }

  // Injetar service de Auth e enviar os dados para a API

  submitRegister(values: any){

    let formData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('userName', values.userName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);

    this.myAuthService.registerUser(formData).subscribe(response => {
      console.log(response);
      this.successMessage = response["message"];
        setTimeout(() => {
          window.location.reload();
          
        }, 3000);
    }, error => {
      this.errorMessage = error.error.message;
      setTimeout(() => {
        window.location.reload();
        
      }, 2000);

    })

    this.registerForm.reset();
  }

}
