import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';

interface UserResponseData {
  userData: {
    first_name: string,
    username: string,
    last_name: string,
    location: string,
    small_bio: string,
    big_bio: string,
    user_image: string,
    background_image: string,
    is_verified: string | number,

  },
  userFollowers: Array<{
    user_following: number,
    first_name: string,
    username: string,
    last_name: string,
    user_image: string,
    is_verified: number,
  }>,
  userFollowing: Array<{
    user_followed: number,
    first_name: string,
    username: string,
    last_name: string,
    user_image: string,
    is_verified: number,
  }>,

  followersCount: {
    Total: number
  },
  followingCount: {
    Total: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  api: string = environment.API_Endpoint;


  constructor(private myAuthService: AuthService, private myHttp: HttpClient) { }

  // This will be the id's of the users 


  getUserData(userId: number){

    const url = this.api + 'users' + "/" + userId;

    return this.myHttp.get<UserResponseData>(url);

  }


  followUser(connectedUser: number, userFollowed: number){

    const url = this.api + 'users' + userFollowed;

    JSON.stringify(connectedUser);

  }

  messageUser(){

  }

}
