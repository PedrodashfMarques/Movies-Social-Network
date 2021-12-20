import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../shared/user.model';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

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
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  banana = false;
  // Connected User Id
  connectedUserId: any;
  // Connected User Id
  
  // Post Likes and Dislikes
  postIsLiked: boolean;
  postIsDisliked: boolean;
  // Post Likes and Dislikes

  
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

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myUserActions: UserActionsService
  ) {}
  
  ngOnInit(): void {
    // this.myAuthService.autologin();
    this.myAuthService.userSubject.subscribe((data: User) => {
      this.connectedUserId = data.userId;
    })

    this.createPostForm();

    this.myUserActions.getUserData(this.connectedUserId).subscribe(data => {
      this.firstName = data[0].userData.first_name;
      this.username = data[0].userData.username;
      this.lastName = data[0].userData.last_name;
      this.numFollowers = data[0].followersCount.Total;
      this.numFollowing = data[0].followingCount.Total;
      this.userProfileImage = data[0].userData.user_image;

      let userVerification = data[0].userData.is_verified;

      if(userVerification === 1 || userVerification === "1"){
        this.userVerification = true;
      } else {
        this.userVerification = false
      }
    })

    this.myUserActions.getAllPosts().subscribe(data => {
      this.allPostsArray = data;
      console.log(this.allPostsArray);

      for (let index = 0; index < this.allPostsArray.length; index++) {

        let posicaoIndex = this.allPostsArray[index];
        // console.log(posicaoIndex.user_id);

        if(posicaoIndex.user_id === this.connectedUserId){
          // console.log(posicaoIndex);
          // perceber se o connectedUserID tem algum registo na tabela de likes sobre este postid em especifico, se retornar sim mensagem: "User has like on this post"
          // Perguntar ao Ivo como posso fazer isto
        }
        
      }
    });


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

    this.myUserActions.createPost(formData).subscribe(response => {
      console.log(response)
    })

    setTimeout(() => {
      this.myUserActions.getAllPosts().subscribe(postsData => { 
        // Talvez aplicar aqui um loading spinner
        this.allPostsArray = postsData;
      })
    }, 500)  

  }

  likePost(postId:number){
    this.myAuthService.userSubject.subscribe(response => {

      this.connectedUserId = response.userId;
    })
    
    this.myUserActions.likeDislikePost(postId, this.connectedUserId).subscribe(responseData => {
      console.log(responseData['message']);

      for (let index = 0; index < this.allPostsArray.length; index++) {

        let posicaoIndex = this.allPostsArray[index];
        
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

  openEditBox(postId, postContent: string){
    this.postIdToEdit = postId;
    this.postContentToEdit = postContent;
    this.userWantsToEdit = !this.userWantsToEdit;
    this.userWantsToPost = !this.userWantsToPost;

  }

  editPost(values: any){
    let formData = new FormData();

    formData.append('content', values.post_content);

    this.myUserActions.editPost(this.connectedUserId, this.postIdToEdit, formData).subscribe(response => {
      console.log(response)
    })


  }

  deletePost(postId: number){
    this.userWantsToEdit = false;
    console.log(postId)

    this.myUserActions.deletePost(postId).subscribe(response => {
      console.log(response);
    });

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
    // console.log(this.postLoaded);
  }


  fecharModal(){
    this.postModalAberto = null;
  }

}