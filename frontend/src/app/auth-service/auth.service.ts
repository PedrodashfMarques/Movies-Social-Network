import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

interface AuthResponseData {
  JWToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;

  userSubject = new BehaviorSubject<User>(null);
  // Send the information inside to other components
  
  api: string = environment.API_Endpoint;


  constructor(
    private myHttp: HttpClient, 
    private jwtHelper: JwtHelperService,
    private myRouter: Router) { }

  loginUser(data: any){
    const url = this.api + 'login';

    let object = {};
    data.forEach((value, key) => object[key] = value);

    let jsonConverted = JSON.stringify(object);

    // console.log(jsonConverted);

    return this.myHttp.post<AuthResponseData>(url, jsonConverted).pipe(catchError(this.handleError), 
    tap( resData => {
      this.handleAuthentication(resData)
    }));
  }

  autologin(){
    let JWToken = localStorage.getItem('authToken');

    if(JWToken.length <= 0){
      this.myRouter.navigate(['']);
    }
    
    let userData: {
      userId: number,
      firstName: string,
      username: string
      lastName: string
      location: string
      smallBio: string
      bigBio: string
      userImage: string
      backgroundImage: string
      isAdmin: number
      isVerified: number
      JWToken: string,
      expiryTime: Date
    } = this.jwtHelper.decodeToken(localStorage.getItem('authToken'));

    // if no userData (nothing on the localStorage) return
    if(!userData){
        return
    }

    let loadedUser = new User(
      userData.userId,
      userData.firstName,
      userData.username,
      userData.lastName,
      userData.location,
      userData.smallBio,
      userData.bigBio,
      userData.userImage,
      userData.backgroundImage,
      userData.isAdmin,
      userData.isVerified,
      JWToken,
      userData.expiryTime
    );

    // if there is a token
    // if(loadedUser.Token) {
    //   const expirationDuration = new Date(userData.expiryTime).getTime() - new Date().getTime();
    //   this.autologout(expirationDuration);
    // }
    
    this.userSubject.next(loadedUser);
    // console.log(loadedUser);
    return loadedUser;
  }


  logoutUser(){
    this.userSubject.next(null);
    localStorage.removeItem('authToken');
    
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer); 
    }

    this.tokenExpirationTimer = null;
  }

  // Test again
  
  // autologout(expirationDuration: number){
  //   console.log(expirationDuration);
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logoutUser();
  //   }, 2000);

  // }



  private handleAuthentication(JWToken: any){
    localStorage.setItem("authToken", JSON.stringify(JWToken));

    // Decode the JWT using jwtHelper
    const JWTdecoded = this.jwtHelper.decodeToken(localStorage.getItem('authToken'));

    //  1 hour until auto-logout
    const expirationDate = new Date(new Date().getTime() + JWTdecoded.expiryTime * 1000);

      const newUser = new User(
      JWTdecoded.userId,
      JWTdecoded.firstName,
      JWTdecoded.username,
      JWTdecoded.lastName,
      JWTdecoded.location,
      JWTdecoded.smallBio,
      JWTdecoded.bigBio,
      JWTdecoded.userImage,
      JWTdecoded.backgroundImage,
      JWTdecoded.isAdmin,
      JWTdecoded.isVerified,
      JWToken,
      expirationDate,

    );

    this.userSubject.next(newUser);

    // console.log(newUser);
    // console.log(JWTdecoded);

    this.autologin();

  }

  
  private handleError(responseError: HttpErrorResponse){
    let errorMessage = "An unknow error occurred";

    switch(responseError.error.message){

      case "Incorrect login information":
      errorMessage = "Incorrect login information";
      break;

      case "Wrong information":
      errorMessage = "Wrong information";
      break;

    }

    return throwError(errorMessage);

  }
}
