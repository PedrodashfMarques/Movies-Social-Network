import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit, OnDestroy {
  @ViewChild('postContent') postContentSearch: ElementRef;

  postsFoundArray: any = [];
  noPostsFound: boolean;
  
  connectedUserId: number;


  // Images
  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";
  // Images

  private allSubscriptions = new Subscription();

  constructor(
    private myUserActions: UserActionsService,
    private myRouter: Router,
    private myAuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.allSubscriptions.add(this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    }))

    this.allSubscriptions.add(this.myUserActions.getAllPosts().subscribe(data => {
      this.postsFoundArray = data;
      // console.log(this.postsFoundArray);
    }))
  }

  pesquisarPost(){
    let postContentAPesquisar: string = this.postContentSearch.nativeElement.value.toLowerCase();
    
    let formData = new FormData();

    formData.append('postContentSearch', postContentAPesquisar);

    this.allSubscriptions.add(this.myUserActions.findPost(formData).subscribe(data => {
      this.postsFoundArray = data;
      // console.log(this.postsFoundArray);

      if(this.postsFoundArray.length <= 0){
        this.noPostsFound = true;

      } else{
        this.noPostsFound = false;
      }
    }))

  }

  likePost(postId:number){
    
    this.allSubscriptions.add(this.myUserActions.likeDislikePost(postId, this.connectedUserId).subscribe(responseData => {
      console.log(responseData);

      for (let index = 0; index < this.postsFoundArray.length; index++) {

        let posicaoIndex = this.postsFoundArray[index];
        
        if(posicaoIndex['post_id'] === postId){
          
          if(responseData['liked'] === true){
            posicaoIndex["likesNumber"]++
          } else {
            posicaoIndex["likesNumber"]--
          }
        }
      }
    
    }))

  }

  ngOnDestroy(): void {
      this.allSubscriptions.unsubscribe();
  }


}
