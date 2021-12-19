import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  // Connected User Id
  connectedUserId: number;
  // Connected User Id

  postId: number;

  @Input() postModal: boolean;

  @Input() postInfo;

  @Input() postsArray: [];

  @Output() closeModal = new EventEmitter<void>();

  // Comments Array
  commentsArray: [] = [];
  messageNotFound: boolean;
  // Comments Array

  // Booleans For Posts
  postIsLiked: boolean;
  postIsDisliked: boolean;
  // Booleans For Posts

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService,
    private myFormBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.myUserActions.getPostData(this.postInfo.post_id).subscribe(data => {
      this.postId = data["postData"].post_id; 
    });

    this.myUserActions.getPostComments(this.postInfo.post_id).subscribe(commentsData => {
      // console.log(commentsData["postComments"]);

      this.commentsArray = commentsData["postComments"];

      
      if(this.commentsArray === undefined){
          this.messageNotFound = true;

      } else {
        this.messageNotFound = false;

      }


    })

  }

  fecharModal(){
    this.closeModal.emit();
  }

  goToUserPage(userId: number){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',userId, 'timeline']);
    })
  }

  likePost(postId:number){
    this.myAuthService.userSubject.subscribe(response => {

      this.connectedUserId = response.userId;
    })
    
    this.myUserActions.likeDislikePost(postId, this.connectedUserId).subscribe(responseData => {
      console.log(responseData['message']);

      for (let index = 0; index < this.postsArray.length; index++) {

        let posicaoIndex = this.postsArray[index];
        
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
    
    });
    
  }

}
