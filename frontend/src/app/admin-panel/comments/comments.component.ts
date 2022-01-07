import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @ViewChild('commentContent') commentContentSearch: ElementRef;

  

  commentsFoundArray: any = [];
  connectedUserId: number;
  noCommentsFound: boolean;


  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  constructor(
    private myAuthService: AuthService,
    private myUserActions: UserActionsService,
    private myRouter: Router
  ) { }

  ngOnInit(): void {
    this.getAllComments();
  }


  getAllComments(){
    this.myUserActions.getAllComments().subscribe(data => {
      this.commentsFoundArray = data;
      
      if(this.commentsFoundArray.length <= 0){
        this.noCommentsFound = true;
      } else {
        this.noCommentsFound = false;

      }
    })
  }


  pesquisarComment(){
    let commentContentAPesquisar = this.commentContentSearch.nativeElement.value.toLowerCase();

    let formData = new FormData();

    formData.append('commentContentSearch', commentContentAPesquisar);

    this.myUserActions.findComment(formData).subscribe(response => {
      this.commentsFoundArray = response;
      
      if(this.commentsFoundArray.length <= 0){
        this.noCommentsFound = true;
      } else {
        this.noCommentsFound = false;

      }
    })

  }

  deleteComment(commentId){

    this.myUserActions.deleteComment(commentId).subscribe(res => {
      console.log(res);

      setTimeout(() => {
        this.getAllComments();   
      }, 100);
    })

    
  }

}
