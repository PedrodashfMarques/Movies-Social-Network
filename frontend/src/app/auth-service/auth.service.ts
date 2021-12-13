import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

interface AuthResponseData {
  userId: number;
  firstName: string;
  username: string;
  lastName: string;
  JWToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null);
  // Ia agora tentar enviar as informações contidas neste userSubject para outros componentes
  
  api: string = environment.API_Endpoint;


  constructor(private myHttp: HttpClient) { }

  loginUser(data: any){
    const url = this.api + 'login';

    let object = {};
    data.forEach((value, key) => object[key] = value);

    let jsonConverted = JSON.stringify(object);

    console.log(jsonConverted);

    return this.myHttp.post<AuthResponseData>(url, jsonConverted).pipe(catchError(this.handleError), 
    tap( resData => {
      this.handleAuthentication(resData.userId, resData.firstName, resData.username, resData.lastName, resData.JWToken)
    }));
  }


  logoutUser(){}



  autologin(){}


  private handleAuthentication(userId: number,fname: string, uname: string, lname: string, token: string){

    const newUser = new User(
      userId,
      fname,
      uname,
      lname,
      token
    );

    this.userSubject.next(newUser);

    localStorage.setItem("userData", JSON.stringify(newUser));

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
