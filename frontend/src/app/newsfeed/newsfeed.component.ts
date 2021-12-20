import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";
  mensagem: string = "Posted November 8th, 2021 at 17h28";
  contentPost: string ="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis alias magni, iusto quo vel id nam. Deleniti blanditiis eius at earum, enim incidunt, expedita tenetur impedit illum, molestias ab porro?"


  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  banana = false;
  // Connected User Id
  connectedUserId: number;
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