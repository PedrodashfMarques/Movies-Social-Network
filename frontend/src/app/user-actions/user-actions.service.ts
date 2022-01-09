import { HttpClient, HttpHeaders, JsonpClientBackend  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
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

  jsonConverter(data){
    let object = {};
    data.forEach((value, key) => object[key] = value);
    let jsonConverted = JSON.stringify(object);

    return jsonConverted;
  }


  checkIfUserExists(urlUserId: number){
    const url = this.api + 'users' + "/" + urlUserId;

    return this.myHttp.get<UserResponseData>(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }
  
  getUserData(userId: number){
    const url = this.api + 'users' + "/" + userId;

    return this.myHttp.get<UserResponseData>(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    }).pipe(tap(resData => {
      this.allUserData.next(resData);
    }));

  }

  updateUserData(data, connectedUserId: number){
    const url = this.api + 'users' + "/" + connectedUserId;

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.put(url, jsonConverted , {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }


  checkIfAlreadyFollowing(idDoUser){
    const url = this.api + "checkFollowUnfollow" + "/" + idDoUser;

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
    }, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }


  getAllPosts(){
    const url = this.api + 'posts';

    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
  }


  getPostData(postId){
    const url = this.api + "posts" + "/" + postId;
    
    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
  }


  createPost(data){
    const url = this.api + "posts";

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }


  editPost( postId, data: FormData){
    const url = this.api + "posts" + "/" + postId;

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.put(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })
  }


  deletePost(postId){
    const url = this.api + "posts" + "/" + postId;

    return this.myHttp.delete(url,{
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })
  }


  likeDislikePost(postId, connectedUserId){

    const url = this.api + 'postsActions';

    return this.myHttp.post(url, {
      postId: postId
    }, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }

  commentPost(data){
    const url = this.api + "comments";
    
    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }

  editComment(commentId: number, data: FormData){
    const url = this.api + "comments" + "/" + commentId;

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.put(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
  }

  deleteComment(commentId: number){
    const url = this.api + "comments" + "/" + commentId;

    return this.myHttp.delete(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
  }


  getAllUsers(){
    const url = this.api + 'users';
    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
  }


  findUser(data){
    const url = this.api + 'findUsers';

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });
    
  }


  findPost(data){
    const url = this.api + 'findPosts';

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }


  findComment(data){
    const url = this.api + 'findComments';

    const jsonConverted = this.jsonConverter(data);

    return this.myHttp.post(url, jsonConverted, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    });

  }
  

  // ADMIN PERMS
  getMetrics(){
    const url = this.api + 'adminPerms';

    return this.myHttp.get(url, {
      headers: new HttpHeaders({
        'x-auth-token': this.JWTokenParsed
      })
    })

  }


  giveRemoveMod(data: FormData){
    const url = this.api + 'adminPerms';

    const jsonConverted = this.jsonConverter(data);

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

  // NO TOKEN NEEDED

  getAllCountries(){
    const url = this.api + 'countries';
    return this.myHttp.get(url);   
  }

  getAllUserCategories(){
    const url = this.api + 'userCategories';
    return this.myHttp.get(url);
  }

  getAllComments(){
    const url = this.api + 'comments';
    
    return this.myHttp.get(url);
  }

  getPostComments(postId: number){
    const url = this.api + "comments" + "/" + postId;

    return this.myHttp.get(url);
  }

  // NO TOKEN NEEDED

}