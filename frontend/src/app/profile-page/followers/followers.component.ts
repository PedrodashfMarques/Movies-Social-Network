import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  userFollowersArray: [] = [];

  idDoUser: number | any;

  // userFollowers: Array<{
  //   user_following: number,
  //   first_name: string,
  //   username: string,
  //   last_name: string,
  //   user_image: string,
  //   is_verified: number,
  // }>;


  // Follower Id

    followerId: any;

  // Follower Id

  userIsVerified: boolean;

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  
  constructor(
    private myUserActions: UserActionsService, 
    private myAuthService: AuthService,
    private myRouter: Router) { }

  ngOnInit(): void {

    this.myUserActions.allUserData.subscribe(data => {
      this.userFollowersArray = data[0].userFollowers;

      console.log(this.userFollowersArray)


    })

  }

  goToFollowerProfile(followerId: any){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',followerId, 'timeline']);
    })
  }

}
