import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../shared/user.model';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit, OnDestroy {

  postForm : FormGroup;

  // User Edit Permissions
  userWantsToEdit: boolean;
  postContentToEdit: string = "";
  postIdToEdit: number;
  userWantsToPost: boolean = true;
  // User Edit Permissions

  // Placeholders
  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";
  // Placeholders

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  userBackgroundImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  banana = false;
  // Connected User Id
  connectedUserId: number;
  // Connected User Id

  // connectedUser is Admin?
  isAdmin;
  // connectedUser is Admin?

  firstName: string;
  username: string;
  lastName: string;
  userVerification: boolean = false;

  numFollowers: number;
  numFollowing: number;

  allPostsArray: any = [];

  // Post Modal
  postModalAberto: boolean;
  postLoaded;

  userWantsToComment: boolean = false;
  // Post Modal

  // Unsubscribe 
  private allSubscritions = new Subscription();
  // Unsubscribe 

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService
  ) {}
  
  ngOnInit(): void {
    this.allSubscritions.add(this.myAuthService.userSubject.subscribe((data: User) => {
      this.connectedUserId = data.userId;
      this.isAdmin = data.isAdmin;
    }));

    this.createPostForm();

    this.allSubscritions.add(this.myUserActions.getUserData(this.connectedUserId).subscribe(data => {
      this.firstName = data[0].userData.first_name;
      this.username = data[0].userData.username;
      this.lastName = data[0].userData.last_name;
      this.numFollowers = data[0].followersCount.Total;
      this.numFollowing = data[0].followingCount.Total;
      this.userProfileImage = data[0].userData.user_image;
      this.userBackgroundImage = data[0].userData.background_image;

      let userVerification = data[0].userData.is_verified;

      if(userVerification === 1 || userVerification === "1"){
        this.userVerification = true;
      } else {
        this.userVerification = false
      }
    }));

    this.allSubscritions.add(this.myUserActions.getAllPosts().subscribe(data => {
      this.allPostsArray = data;
    }));

  }

  createPostForm(){
    this.postForm = this.myFormBuilder.group({
      'post_content' : ['', Validators.compose([
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(5000)])]
      })
  }

  createPost(values: any){
    let formData = new FormData();
    
    formData.append('user_id', String(this.connectedUserId));
    formData.append('content', values.post_content);

    this.allSubscritions.add(this.myUserActions.createPost(formData).subscribe(response => {
      // console.log(response);
    }));

    setTimeout(() => {
      this.allSubscritions.add(this.myUserActions.getAllPosts().subscribe(postsData => { 
        this.allPostsArray = postsData;
      }))
    }, 200)

  }


  likePost(postId:number){
    this.allSubscritions.add(this.myUserActions.likeDislikePost(postId, this.connectedUserId).subscribe(responseData => {

      for (let index = 0; index < this.allPostsArray.length; index++) {

        let posicaoIndex = this.allPostsArray[index];
        
        if(posicaoIndex['post_id'] === postId){
          
          if(responseData['liked'] === true){
            posicaoIndex["likesNumber"]++
          } else {
            posicaoIndex["likesNumber"]--
          }
        }
      }
    
    }));

  }

  openEditBox(postId, postContent: string){
    this.postIdToEdit = postId;
    this.postContentToEdit = postContent;
    this.userWantsToEdit = !this.userWantsToEdit;
    this.userWantsToPost = !this.userWantsToPost;
  }

  editPost(values: any){
    let formData = new FormData();

    formData.append('content', values.post_content);

    this.allSubscritions.add(this.myUserActions.editPost(this.postIdToEdit, formData).subscribe(response => {
      console.log(response);
    }))

  }
  

  deletePost(postId: number){
    this.userWantsToEdit = false;

    this.allSubscritions.add(this.myUserActions.deletePost(postId).subscribe(response => {
      setTimeout(() => {
        this.allSubscritions.add(this.myUserActions.getAllPosts().subscribe(data => {
          this.allPostsArray = data;
        }))
      }, 100)
    }));

  }


  goToUserPage(userId: number){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',userId, 'timeline']);
    })
  }


  abrirPost(cadaPost){
    this.postModalAberto = !this.postModalAberto;
    this.postLoaded = cadaPost;
  }


  fecharModal(){
    this.postModalAberto = null;
  }


  goToConnectedUserPage(){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }

  ngOnDestroy(): void {
      this.allSubscritions.unsubscribe();
  }


}