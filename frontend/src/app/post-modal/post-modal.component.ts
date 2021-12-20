import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {

  // User Edit Permissions
  userWantsToEdit: boolean;
  commentContentToEdit: string = "";
  commentIdToEdit: number;
  userWantsToComment: boolean = false;

  // User Edit Permissions


  imagesPath = "http://localhost/backend/";
  userProfileImage: string;


  commentForm: FormGroup;

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  // Connected User Id
  connectedUserId: any;
  // Connected User Id


  postId: any;

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
    this.myAuthService.userSubject.subscribe(response => {
      this.connectedUserId = response.userId;
    })

    this.commentPostForm();
    this.myUserActions.getPostData(this.postInfo.post_id).subscribe(data => {
      this.postId = data["postData"].post_id; 
    });

    this.myUserActions.getPostComments(this.postInfo.post_id).subscribe(commentsData => {
      // console.log(commentsData["postComments"]);

      this.commentsArray = commentsData["postComments"];

      console.log(this.commentsArray)

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

  openComment(){
    this.userWantsToComment = !this.userWantsToComment;
    this.userWantsToEdit = false;

  }

  commentPostForm(){
    this.commentForm = this.myFormBuilder.group({
      'comment_content' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(25)])]
      })
    
  }

  // CREATE COMMENT
  postComment(values: any){
    let formData = new FormData();
    formData.append('userId', this.connectedUserId);
    formData.append('postId', this.postId);
    formData.append('content', values.comment_content);

    this.myUserActions.commentPost(formData).subscribe( response => {
      console.log(response);
    })

    // O que fiz aqui tb posso fazer para atualizar os likes no timeline component
    setTimeout(() => {
      this.myUserActions.getPostComments(this.postInfo.post_id).subscribe(commentsData => { 
        // Talvez aplicar aqui um loading spinner
        this.messageNotFound = false;
        
        this.commentsArray = commentsData["postComments"];

        for (let index = 0; index < this.postsArray.length; index++) {
          
          let posicaoIndex = this.postsArray[index];

          if(posicaoIndex["post_id"] === this.postInfo.post_id){
            posicaoIndex["commentsNumber"]++;
          }
       
        }

      })
    }, 500)  

  }

  // CREATE COMMENT


  // UPDATE COMMENT

  openEditBox(commentId:number, commentContent: string){
    this.commentIdToEdit = commentId;
    this.commentContentToEdit = commentContent;
    this.userWantsToEdit = !this.userWantsToEdit;
    this.userWantsToComment = false;

  }

  editComment(values: any){
    let formData = new FormData();
    formData.append('content', values.comment_content);

    this.myUserActions.editComment(this.commentIdToEdit, formData).subscribe(response => {
      setTimeout(() => {
        this.myUserActions.getPostComments(this.postInfo.post_id).subscribe(commentsData => { 
          // Talvez aplicar aqui um loading spinner
         this.commentsArray = commentsData["postComments"];
         
        })
      }, 500)  
    })

    this.userWantsToEdit = false;
  }
  // UPDATE COMMENT



  // DELETE COMMENT

  deleteComment(commentId:number){
    this.userWantsToEdit = false;
    this.myUserActions.deleteComment(commentId).subscribe(data => {
      console.log(data);
    })

    for (let index = 0; index < this.postsArray.length; index++) {
          
      let posicaoIndex = this.postsArray[index];

      if(posicaoIndex["post_id"] === this.postInfo.post_id){
        posicaoIndex["commentsNumber"]--;
      }
   
    }
    
    setTimeout(() => {
      this.myUserActions.getPostComments(this.postInfo.post_id).subscribe(commentsData => { 
        // Talvez aplicar aqui um loading spinner
        
        this.commentsArray = commentsData["postComments"];
        if(this.commentsArray === undefined){
          this.messageNotFound = true;
        }
      })
    }, 100)  
    
  }
  // DELETE COMMENT




}
