import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  userInformation: FormGroup
  allCountriesArray: [];

  connectedUserId: number;

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService
  ) { }

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    })
    
    this.getCountries();
  }

  getCountries(){
    this.myUserActions.getAllCountries().subscribe(data => {
      console.log(data);
    })

  }

  showUserInformation(){
    
  }

  updateUserInformation(){

  }



}
