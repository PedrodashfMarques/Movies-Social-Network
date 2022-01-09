import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit, OnDestroy {

  imagesPath = "http://localhost/backend/";
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  followingUsersArray: [] = [];

  mySubscription: Subscription;

  constructor(
    private myUserActions: UserActionsService,
    private myRouter: Router
  ) { }

  ngOnInit(): void {
    this.mySubscription = this.myUserActions.allUserData.subscribe(data => {
      this.followingUsersArray = data[0].userFollowing;

    })
  }

  goToFollowingUserPage(followingUserId: number){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',followingUserId, 'timeline']);
    })
  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }

}
