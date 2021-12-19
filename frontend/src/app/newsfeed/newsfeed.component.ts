import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../shared/user.model';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";
  mensagem: string = "Posted November 8th, 2021 at 17h28";
  contentPost: string ="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis alias magni, iusto quo vel id nam. Deleniti blanditiis eius at earum, enim incidunt, expedita tenetur impedit illum, molestias ab porro?"
  
  // Connected User Id
  connectedUserId: number;
  // Connected User Id

  firstName: string;
  username: string;
  lastName: string;
  userVerification: boolean = false;

  numFollowers: number;
  numFollowing: number;

  allPostsArray: any = [];

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService
  ) {}
  
  ngOnInit(): void {
    // this.myAuthService.autologin();
    this.myAuthService.userSubject.subscribe((data: User) => {
      this.connectedUserId = data.userId;
    })

    this.myUserActions.getUserData(this.connectedUserId).subscribe(data => {
      this.firstName = data[0].userData.first_name;
      this.username = data[0].userData.username;
      this.lastName = data[0].userData.last_name;
      this.numFollowers = data[0].followersCount.Total;
      this.numFollowing = data[0].followingCount.Total;

      let userVerification = data[0].userData.is_verified;

      if(userVerification === 1 || userVerification === "1"){
        this.userVerification = true;
      } else {
        this.userVerification = false
      }
    })

    this.myUserActions.getAllPosts().subscribe(data => {
      this.allPostsArray = data;
      console.log(this.allPostsArray);
    });

  }

}