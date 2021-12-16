import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  userIsVerified: any = false;
  mensagem: string = "Posted November 8th, 2021 at 17h28";


  // Post Likes and Dislikes
    postIsLiked: boolean;
    postIsDisliked: boolean;
  // Post Likes and Dislikes


  // Post Content
  userPostsArray: [];
  // Post Content


  // Post id to checkIfLikeExists
  checkPostId: number;
  // Post id to checkIfLikeExists

  constructor(
    private myUserActions: UserActionsService, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myActiveRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.myAuthService.autologin();

    this.myUserActions.allUserData.subscribe(data => {
      this.userPostsArray = data[0].userPosts;

      let userVerification = data[0].userData.is_verified;

      if(userVerification === 1 || userVerification === "1"){
        this.userIsVerified = true;
      } else {
        this.userIsVerified = false
      }
      
    })

    // Conforme tal informação aplicar uma classe ou outra / *ngIf para adicionar um <i> ou outro
  }

  likePost(postId:number){
    let connectedUserId: number;
    this.myAuthService.userSubject.subscribe(response => {
      // console.log(response.userId)
      connectedUserId = response.userId;
    })
    
    this.myUserActions.likeDislikePost(postId, connectedUserId).subscribe(responseData => {
      console.log(responseData['message']);

      for (let index = 0; index < this.userPostsArray.length; index++) {

        let posicaoIndex = this.userPostsArray[index];
        
        if(posicaoIndex['post_id'] === postId){
          
          if(responseData['message'] === 'Post liked!'){
            posicaoIndex["likesNumber"]++
            this.postIsLiked = true;
          } else {
            posicaoIndex["likesNumber"]--
            this.postIsDisliked = false;
          }
        }
      }
    
    }, errorRes => {
      console.log(errorRes)
    })

  }

}
