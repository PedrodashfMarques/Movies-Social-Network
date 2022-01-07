import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @ViewChild('commentContent') commentContent: ElementRef;

  @ViewChild('editPostContent') editPostContent: ElementRef;

  postId: number;
  connectedUserId: number;


  vouEditarPost: boolean;

  commentIdToEdit: number;
  commentContentToEdit: string;
  userWantsToEdit: boolean;

  commentModalAberto: boolean;

  // Comments Array
  commentsArray: any = [];
  commentsNotFound: boolean;
  // Comments Array

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  // Post Data
    postOwnerId;
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
        if(response["message"] === "Post does not exist"){
          this.myRouter.navigate(['newsfeed']);
        } else{
          this.postOwnerId = response["postData"]["user_id"];
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
        }

      })
    }

    this.myUserActions.getPostComments(this.postId).subscribe(response => {
      // console.log(response["postComments"])

      if(response["message"] === "Comments Not Found" || response["postComments"] === undefined){
        this.commentsNotFound = true;
      } else {
        this.commentsArray = response["postComments"];
        this.commentsNotFound = false;

      }
    })

  }

   // POSTS

  likePost(){
    this.myUserActions.likeDislikePost(this.postId, this.connectedUserId).subscribe(res => {

      if(res["liked"] === true){
        this.likesNumber++;
      } else {
        this.likesNumber--;
      }

    })
  }

  openEditPostBox(){
    this.vouEditarPost = !this.vouEditarPost;
  }

  editPost(){
    let newPostContent = this.editPostContent.nativeElement.value.toLowerCase();

    let formData = new FormData();

    formData.append('content', newPostContent);

    if(newPostContent.length <= 0){
      this.vouEditarPost = false;
    } else{
      this.myUserActions.editPost(this.postId, formData).subscribe(response => {
        // console.log(response);
      this.vouEditarPost = false;
        setTimeout(() => {
            this.ngOnInit();
        }, 100);
      })
    }


  }

  deletePost(){
    this.myUserActions.deletePost(this.postId).subscribe(res => {
      console.log(res);
      this.myRouter.navigate(['newsfeed']);
    })
  }

  // POSTS


  // COMMENTS

  abrirCommentModal(){
    this.commentModalAberto = !this.commentModalAberto;
  }

  fecharModal(){
    this.commentModalAberto = null;
  }


  openEditBox(commentId:number, commentContent: string){
    this.commentIdToEdit = commentId;
    this.commentContentToEdit = commentContent;
    this.userWantsToEdit = !this.userWantsToEdit;
  }

  editComment(){
    let commentContent = this.commentContent.nativeElement.value.toLowerCase();

    if(commentContent.length <= 0){
      this.myRouter.navigateByUrl('/post-detail', {skipLocationChange: true})
      .then(() => {
        this.myRouter.navigate(['/post-detail/', this.postId]);
      })
      
    } else {
      let formData = new FormData();
      formData.append('content', commentContent);

      this.myUserActions.editComment(this.commentIdToEdit, formData).subscribe(response => {
        setTimeout(() => {
          this.myUserActions.getPostComments(this.postId).subscribe(response => {
            this.commentsArray = response["postComments"];
            this.userWantsToEdit = false;
          })
        }, 200)
      })

    }

  }

  deleteComment(commentId: number){
    this.userWantsToEdit = false;
    console.log(commentId);

    this.myUserActions.deleteComment(commentId).subscribe(response =>{
      console.log(response);
    })

    for (let index = 0; index < this.commentsArray.length; index++) {
      let posicaoDoIndex = this.commentsArray[index];

      if(posicaoDoIndex["comment_id"] === commentId){
        this.commentsNumber--;
      }
    }

    setTimeout(() => {
      this.myUserActions.getPostComments(this.postId).subscribe(response => {
        this.commentsArray = response["postComments"];
        this.userWantsToEdit = false;
      })
    }, 100);

  }

  // COMMENTS

  goToUserPage(userId: number){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',userId, 'timeline']);
    })
  }

  goToConnectedUserPage(){
  this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }

}