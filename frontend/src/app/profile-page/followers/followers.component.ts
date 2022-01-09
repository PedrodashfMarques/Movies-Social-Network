import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit, OnDestroy {
  userFollowersArray: [] = [];

  idDoUser: number | any;

  imagesPath = "http://localhost/backend/";
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  // Follower Id
    followerId: any;
  // Follower Id

  userIsVerified: boolean;

  mySubscription: Subscription;

  
  constructor(
    private myUserActions: UserActionsService, 
    private myRouter: Router) { }

  ngOnInit(): void {
    this.mySubscription = this.myUserActions.allUserData.subscribe(data => {
      this.userFollowersArray = data[0].userFollowers;

      console.log(this.userFollowersArray);

    })

  }

  goToFollowerProfile(followerId: any){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',followerId, 'timeline']);
    })
  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe();
  }

}
