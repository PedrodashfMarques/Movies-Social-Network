import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  idDoUser: number | any;

  userFollowers: Array<{
    user_following: number,
    first_name: string,
    username: string,
    last_name: string,
    user_image: string,
    is_verified: number,
  }>;

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService) { }

  ngOnInit(): void {

    this.myUserActions.allUserData.subscribe(response => {
      // console.log(response);
    })



  }

}
