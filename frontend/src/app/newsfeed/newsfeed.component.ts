import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";

  userIsVerified: boolean = true;

  mensagem: string = "Posted November 8th, 2021 at 17h28";

  contentPost: string ="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis alias magni, iusto quo vel id nam. Deleniti blanditiis eius at earum, enim incidunt, expedita tenetur impedit illum, molestias ab porro?"
  

  connectedUserInfo = {
    userId: 0,
    firstName: '',
    username: '',
    lastName: ''
  };

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router
  ) {}

  ngOnInit(): void {
    this.myAuthService.autologin();
    
    this.myAuthService.userSubject.subscribe((data: User) => {
      this.connectedUserInfo.userId = data.userId;
      this.connectedUserInfo.firstName = data.firstName;
      this.connectedUserInfo.username = data.username;
      this.connectedUserInfo.lastName = data.lastName;
    })
    console.log("Este é o newsfeed component a funcionar");
  }

  daLike(){
    console.log("hello")
  }



}