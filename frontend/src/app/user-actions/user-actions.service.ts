import { HttpClient, HttpHeaders  } from '@angular/common/http';
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
  // 'src/environments/environment'

  allUserData = new BehaviorSubject<UserResponseData>(null);

  constructor(private myAuthService: AuthService, private myHttp: HttpClient) { }

  // This will be the id's of the users 

  getUserData(userId: number){
    const url = this.api + 'users' + "/" + userId;

    return this.myHttp.get<UserResponseData>(url).pipe(tap(resData => {
      this.handleUserData(resData);
    }));

  }

  private handleUserData(resData){
    this.allUserData.next(resData);
    // console.log(this.allUserData.value);

  }

  getAllPosts(){
    // parafazer a routeValidation vou necessitar de ir buscar o JWT ao local Storage
    let JWToken = localStorage.getItem('authToken');
    
    const url = this.api + 'posts';

    return this.myHttp.get(url);

  }

  getPostData(postId){
    const url = this.api + "posts" + "/" + postId;

    return this.myHttp.get(url);
  }

  getPostComments(postId: number){
    const url = this.api + "comments" + "/" + postId;

    return this.myHttp.get(url);

  }

  createPost(data: FormData){
    const url = this.api + "posts";

    let JWToken = localStorage.getItem('authToken');
    
    const headers = new HttpHeaders()
    .set('x-auth-token', JWToken);

    console.log(headers.get('x-auth-token'));

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    return this.myHttp.post(url, dataConvertedJson, {});
  }

  editPost(connectedUserId, postId, data: FormData){
    const url = this.api + "posts" + "/" + postId;

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    console.log(object);

    return this.myHttp.put(url, {
      user_id: connectedUserId,
      content: object
    });
  }

  deletePost(postId){
    const url = this.api + "posts" + "/" + postId;
    return this.myHttp.delete(url);
  }

  likeDislikePost(postId, connectedUserId){

    const url = this.api + 'postsActions';

    return this.myHttp.post(url, {
      userId: connectedUserId,
      postId: postId
    })

  }



  commentPost(data){
    const url = this.api + "comments";

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    // console.log(jsonConverted);

    return this.myHttp.post(url, dataConvertedJson, {responseType: 'json'});

  }

  editComment(commentId: number, data: FormData){
    const url = this.api + "comments" + "/" + commentId;

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    return this.myHttp.put(url, dataConvertedJson);

  }

  deleteComment(commentId: number){
    const url = this.api + "comments" + "/" + commentId;

    return this.myHttp.delete(url);

  }


  checkIfAlreadyFollowing(idDoUser, connectedUser){
    const url = this.api + 'checkFollowUnfollow' + "/" + idDoUser;

    return this.myHttp.post(url, {
      userId: connectedUser
    })
    
  }
  
  followUnfollowUser(idDoUser, connectedUserId){
    const url = this.api + 'users' + "/" + idDoUser;

    return this.myHttp.post(url, {
      userId: connectedUserId
    })

  }

  getAllCountries(){
    const url = this.api + 'countries';
  
    return this.myHttp.get(url);   
  }

  updateUserData(data, connectedUserId: number){
    const url = this.api + 'users' + "/" + connectedUserId;

    let object = {};
    data.forEach((value, key) => object[key] = value);

    let jsonConverted = JSON.stringify(object);

    // console.log(jsonConverted);

    return this.myHttp.put(url, jsonConverted, {responseType: 'json'});
  }

}
