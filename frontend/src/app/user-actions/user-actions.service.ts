import { HttpClient, HttpHeaders, JsonpClientBackend  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
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
  
    JWToken = localStorage.getItem('authToken');

    // JSON Parsed
    JWTokenParsed = JSON.parse(this.JWToken)["X-Auth-Token"];
    // JSON Parsed


  checkIfUserExists(urlUserId: number){
    const url = this.api + 'users' + "/" + urlUserId;
    return this.myHttp.get<UserResponseData>(url);

  }
  
  getUserData(userId: number){
    const url = this.api + 'users' + "/" + userId;

    return this.myHttp.get<UserResponseData>(url).pipe(tap(resData => {
      this.allUserData.next(resData);
    }));

    // return this.myHttp.get<UserResponseData>(url, {
    //   headers: new HttpHeaders({
    //     'x-auth-token': this.JWTokenParsed
    //   })
    // }).pipe(tap(resData => {
    //   this.allUserData.next(resData);
    // }));

  }

  getAllPosts(){
    const url = this.api + 'posts';

    return this.myHttp.get(url);

    // return this.myHttp.get(url, {
    //   headers: new HttpHeaders({
    //     'x-auth-token': this.JWTokenParsed
    //   })
    // });
  }

  getAllComments(){
    const url = this.api + 'comments';
    
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

    // formData Convert
    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);
    // formData Convert

    return this.myHttp.post(url, dataConvertedJson);

    return this.myHttp.post(url, dataConvertedJson, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }

  editPost( postId, data: FormData){
    const url = this.api + "posts" + "/" + postId;

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    return this.myHttp.put(url, dataConvertedJson);
    // Enviar auth-token para validação se o user tem auth ou não para fazer o update ao comentário
  }


  deletePost(postId){
    const url = this.api + "posts" + "/" + postId;

    return this.myHttp.delete(url);
      // Enviar auth-token para validação se o user tem auth ou não para fazer o delete ao comentário
  }


  likeDislikePost(postId, connectedUserId){

    const url = this.api + 'postsActions';

    return this.myHttp.post(url, {
      userId: connectedUserId,
      postId: postId
    })

    // Enviar aqui o auth token também

  }


  commentPost(data){
    const url = this.api + "comments";

    let object = {};
    data.forEach((value, key) => object[key] = value);

    let dataConvertedJson = JSON.stringify(object);

    return this.myHttp.post(url, dataConvertedJson, {responseType: 'json'});

  }

  editComment(commentId: number, data: FormData){
    const url = this.api + "comments" + "/" + commentId;

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let dataConvertedJson = JSON.stringify(object);

    return this.myHttp.put(url, dataConvertedJson);
    
    // Aqui vou enviar o JWToken provavelmente

  }

  deleteComment(commentId: number){
    const url = this.api + "comments" + "/" + commentId;

    return this.myHttp.delete(url);

    // Aqui vou enviar o JWToken provavelmente

  }


  checkIfAlreadyFollowing(idDoUser){
    const url = this.api + "checkFollowUnfollow" + "/" + idDoUser;

    // return this.myHttp.get(url); 

    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
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

  getAllUsers(){
    const url = this.api + 'users';
    return this.myHttp.get(url);
  }

  findUser(data){
    const url = this.api + 'findUsers';

    let object = {};
    data.forEach((value, key) => object[key] = value);

    let jsonConverted = JSON.stringify(object);

    return this.myHttp.post(url, jsonConverted);   
  }

  findPost(data){
    const url = this.api + 'findPosts';

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let jsonConverted = JSON.stringify(object);

    return this.myHttp.post(url, jsonConverted);

  }

  findComment(data){
    const url = this.api + 'findComments';

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let jsonConverted = JSON.stringify(object);
 
    return this.myHttp.post(url, jsonConverted);
  }
  
  
  getAllUserCategories(){
    const url = this.api + 'userCategories';
    return this.myHttp.get(url);
  }


  // ADMIN PERMS

  getMetrics(){
    const url = this.api + 'adminPerms';

    return this.myHttp.get(url);

    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }


  giveRemoveMod(data: FormData){
    const url = this.api + 'adminPerms';

    let object = {};
    data.forEach((value, key) => object[key] = value);
    let jsonConverted = JSON.stringify(object);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })
    
  }

  deleteUser(userId: number){
    const url = this.api + 'adminPerms' + "/" + userId;

    return this.myHttp.delete(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }
  // ADMIN PERMS


}