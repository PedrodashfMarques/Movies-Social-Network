import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  userIsVerified: boolean;

  connectedUserId: number;

  postThatWasLiked;

  imagesPath = "http://localhost/backend/";
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  // Post Likes and Dislikes
    postIsLiked: boolean;
  // Post Likes and Dislikes


  // Post Content
  userPostsArray: any | [] = [];
  // Post Content


  // Post id to checkIfLikeExists
  checkPostId: number;
  // Post id to checkIfLikeExists

  private allSubscriptions = new Subscription();

  constructor(
    private myUserActions: UserActionsService, 
    private myAuthService: AuthService,
    private myRouter: Router
    ) {}


    ngOnInit(): void {
      this.allSubscriptions.add(this.myAuthService.userSubject.subscribe(data => {
        this.connectedUserId = data.userId;
      }));


    this.allSubscriptions.add(this.myUserActions.allUserData.subscribe((data: any) => {
      if(data === null){
        this.userPostsArray = [];

      } else{
        this.userPostsArray = data[0].userPosts;

      }

      let userVerification = data[0].userData["is_verified"];
      // console.log(data[0].userData);

      if(userVerification === 1 || userVerification === "1"){
        this.userIsVerified = true;
      } else {
        this.userIsVerified = false
      }
      
    }))
  }

  likePost(postId:number){

    this.allSubscriptions.add(this.myUserActions.likeDislikePost(postId, this.connectedUserId).subscribe(responseData => {
      // console.log(postId);

      for (let index = 0; index < this.userPostsArray.length; index++) {

        let posicaoIndex = this.userPostsArray[index];
        
        if(posicaoIndex['post_id'] === postId){
          
          if(responseData['liked'] === true){
            posicaoIndex["likesNumber"]++
            
            this.postIsLiked = !this.postIsLiked;
          } else {
            posicaoIndex["likesNumber"]--
            this.postIsLiked = false ;

          }
        }
      }
    
    }, errorRes => {
      console.log(errorRes)
    }))

  }

  ngOnDestroy(): void {
      this.allSubscriptions.unsubscribe();
  }

}
