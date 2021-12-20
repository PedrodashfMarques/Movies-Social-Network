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

  imagesPath = "http://localhost/backend/";
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  followingUsersArray: [] = [];

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

  goToFollowingUserPage(followingUserId: number){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',followingUserId, 'timeline']);
    })
  }

}
