import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  api: string = environment.API_Endpoint;


  constructor(private myAuthService: AuthService) { }

  // This will be the id's of the users 
  followUser(connectedUser: number, userFollowed: number){

    const url = this.api + 'users' + userFollowed;

    JSON.stringify(connectedUser);

  }

  loadUser(){

    
  }


  messageUser(){

  }

}
