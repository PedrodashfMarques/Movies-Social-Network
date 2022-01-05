import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('postContent') postContentSearch: ElementRef;

  postsFoundArray: any = [];
  noPostsFound: boolean;

  connectedUserId: number;

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  constructor(
    private myAuthService: AuthService,
    private myUserActions: UserActionsService,
    private myRouter: Router
  ) { }

  ngOnInit(): void {
   this.getAllPosts();

  }

  getAllPosts(){
    this.myUserActions.getAllPosts().subscribe(data => {
      this.postsFoundArray = data;
      console.log(this.postsFoundArray)
    })
  }


  pesquisarPost(){
    let postContentAPesquisar: string = this.postContentSearch.nativeElement.value.toLowerCase();
    
    let formData = new FormData();

    formData.append('postContentSearch', postContentAPesquisar);

    this.myUserActions.findPost(formData).subscribe(data => {
      this.postsFoundArray = data;

      if(this.postsFoundArray.length <= 0){
        this.noPostsFound = true;

      } else{
        this.noPostsFound = false;
      }
    })
  }

  deletePost(postId: number){
    this.myUserActions.deletePost(postId).subscribe(response => {
      console.log(response);

      setTimeout(() => {
        this.getAllPosts();
        
      }, 100);
    });
  }

}
