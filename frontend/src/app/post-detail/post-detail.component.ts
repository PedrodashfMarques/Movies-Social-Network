import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postId: number;
  connectedUserId: number;

  commentsArray: any = [];

  
  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  // Post Data
    firstName;
    username;
    lastName;
    userImage;
    isVerified;
  // Post Data

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService,
    private myAuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    })

    this.postId = +this.myActiveRoute.snapshot.params["id"];

    if(isNaN(this.postId)){
      this.myRouter.navigate(['newsfeed']);
    } else {
      this.myUserActions.getPostData(this.postId).subscribe(response => {
        console.log(response);

      }, error => {
        if(error.error.message === "Post Not Found"){
          this.myRouter.navigate(['newsfeed']);

        }
      })
    }

  }

}
