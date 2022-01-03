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

  // Comments Array
  commentsArray: any = [];
  commentsNotFound: boolean;
  // Comments Array

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  // Post Data
    firstName;
    username;
    lastName;
    userImage;
    isVerified;
    createdAt;
    postContent;
    likesNumber;
    commentsNumber;
    isLiked: boolean;
    isCommented: boolean;
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
        this.firstName = response["postData"]["first_name"];
        this.username = response["postData"]["username"];
        this.lastName = response["postData"]["last_name"];
        this.userImage = response["postData"]["user_image"];
        this.isVerified = response["postData"]["is_verified"];
        this.createdAt = response["postData"]["created_at"];
        this.postContent = response["postData"]["content"];
        this.likesNumber = response["postData"]["likesNumber"];
        this.commentsNumber = response["postData"]["commentsNumber"];
        this.isLiked = response["postData"]["isLiked"];
        this.isCommented = response["postData"]["isCommented"];

      }, error => {
        if(error.error.message === "Post Not Found"){
          this.myRouter.navigate(['newsfeed']);

        }
      })
    }

    this.myUserActions.getPostComments(this.postId).subscribe(response => {
      console.log(response["postComments"][0])
      if(response["message"] === "Comments Not Found"){
        this.commentsNotFound = true;
      } else {
        this.commentsArray = response["postComments"];
        this.commentsNotFound = false;

      }
    })

  }

  likePost(){
    this.myUserActions.likeDislikePost(this.postId, this.connectedUserId).subscribe(res => {
      console.log(res);

      if(res["liked"] === true){
        this.likesNumber++;
      } else {
        this.likesNumber--;
      }

    })
  }

  goToUserPage(userId: number){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',userId, 'timeline']);
    })
  }

}
