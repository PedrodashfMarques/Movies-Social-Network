import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../shared/PasswordMatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private myFormBuilder: FormBuilder) { }


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
    formData.append('lastname', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmPassword', values.confirmPassword);
    
    console.log(values);

    this.registerForm.reset();

  }

}
