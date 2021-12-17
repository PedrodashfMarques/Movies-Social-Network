import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  followingUsersArray: [] = [];

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  constructor(
    private myUserActions: UserActionsService, 
    private myAuthService: AuthService,
    private myRouter: Router
  ) { }

  ngOnInit(): void {
    this.myUserActions.allUserData.subscribe(data => {
      this.followingUsersArray = data[0].userFollowing;

      console.log(this.followingUsersArray)

    })
  }

}
