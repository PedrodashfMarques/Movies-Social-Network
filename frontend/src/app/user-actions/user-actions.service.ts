import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';
import { UserResponseData } from '../shared/userResponseData.model';


@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  api: string = environment.API_Endpoint;

  allUserData = new BehaviorSubject<UserResponseData>(null);

  constructor(private myAuthService: AuthService, private myHttp: HttpClient) { }

  // This will be the id's of the users 

  getUserData(userId: number){
    const url = this.api + 'users' + "/" + userId;

    return this.myHttp.get<UserResponseData>(url).pipe(tap(resData => {
      this.handleUserData(resData)
    }));

  }

  private handleUserData(resData){
    this.allUserData.next(resData);
    console.log(this.allUserData.value);

  }

  // followUser(connectedUser: number, userFollowed: number){

  //   const url = this.api + 'users' + userFollowed;

  //   JSON.stringify(connectedUser);

  // }


  likeDislikePost(postId, connectedUserId){

    const url = this.api + 'postsActions';

    return this.myHttp.post(url, {
      userId: connectedUserId,
      postId: postId
    }).pipe()

  }



}
