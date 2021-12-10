import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private myFormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginUserForm();

  }


  loginUserForm(){
    this.loginForm = this.myFormBuilder.group({
      // Fiquei aqui
    })
  }

  submitLogin(values: any){

    console.log(values);

  }

}
