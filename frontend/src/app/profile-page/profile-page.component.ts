import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  imagemBackground: string = "https://steamuserimages-a.akamaihd.net/ugc/448490901519563018/1DBA511F88594E8E29FA8F1B56329CFD7B2DEC4E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";
  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  userBackgroundImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  // id no url
  idDoUser: number;
  // id no url

  // USER DATA
    firstName: string
    username: string
    lastName: string
    location: string
    smallBio: string
    numFollowers: number
    numFollowing: number
    category: string
  // USER DATA
  
  // Connected User id
  connectedUserId: number;
  // Connected User id

   // Connected Username
   connectedUsername: string;
   // Connected Username

  // Botão Follow Unfollow
  followMyself: boolean;
  // Botão Follow Unfollow

  // Follow or Unfollow message
  followUnfollowMessage: string = "";
  // Follow or Unfollow message

  // Similar Users
  similarUsersArray: any;
  // Similar Users

  // Following Users
  followingUsersArray: any;
  // Following Users

  userIsVerified: boolean = false;
  
  // Rotas Ativas
  timelineClicked: boolean = false;
  aboutClicked: boolean = false;
  followersClicked: boolean = false;
  followingClicked: boolean = false;

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService,
    private myAuthService: AuthService
    ) {
      myRouter.events.subscribe((event: NavigationStart) => {
        if(event.navigationTrigger === 'popstate'){
          window.location.reload();
        }
      })
    }


  ngOnInit(): void {
    this.idDoUser = +this.myActiveRoute.snapshot.params['id'];
    
    if(isNaN(this.idDoUser)){
      this.myRouter.navigate(['newsfeed']); 
    }
    else if(Number(this.idDoUser)){
      this.myUserActions.checkIfUserExists(this.idDoUser).subscribe(response => {
        if(response["message"] === "User does not exist"){
          this.myRouter.navigate(['newsfeed']);
        } else {
            this.showTimeline();
        }
      })
    }

    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
      this.connectedUsername = data.username;

      if( Number(this.connectedUserId) === Number(this.idDoUser)){
        this.followMyself = false;
      } else{
        this.followMyself = true;

      }
    })
    
    this.myUserActions.checkIfAlreadyFollowing(this.idDoUser).subscribe(response => {

      if(response["message"] === "Already Following"){
        this.followUnfollowMessage = 'Unfollow';
      } else {
        this.followUnfollowMessage = 'Follow';

      }
    }, error => {
      if(error.error.message === "Users are the same"){
        this.followUnfollowMessage = "";
      }
    })

    this.myUserActions.getUserData(this.idDoUser).subscribe(data => { 
      this.firstName = data[0].userData.first_name;
      this.username = data[0].userData.username;
      this.lastName = data[0].userData.last_name;
      this.location = data[0].userData.location;
      this.smallBio = data[0].userData.small_bio;
      this.numFollowers = data[0].followersCount.Total;
      this.numFollowing = data[0].followingCount.Total;
      this.userProfileImage = data[0].userData.user_image;
      this.userBackgroundImage = data[0].userData.background_image;
      this.followingUsersArray = data[0].userFollowing;
      this.category = data[0].userData.category;
      this.similarUsersArray = data[0].similarUsers;
    });

    
  }


  showTimeline(){
    this.myRouter.navigate(['timeline'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = true;
    this.aboutClicked = false;
    this.followersClicked = false;
    this.followingClicked = false;
  }
  

  showAboutComponent(){
    this.myRouter.navigate(['about'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = true;
    this.followersClicked = false;
    this.followingClicked = false;
  }


  showFollowersComponent(){
    this.myRouter.navigate(['followers'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = false;
    this.followersClicked = true;
    this.followingClicked = false;
  }


  showFollowingComponent(){
    this.myRouter.navigate(['following'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = false;
    this.followersClicked = false;
    this.followingClicked = true;
  }


  followUser(){
    this.myUserActions.followUnfollowUser(this.idDoUser, this.connectedUserId).subscribe(response => {

      if(response['message'] === 'User followed!'){
        this.numFollowers++
        this.followUnfollowMessage = "Unfollow";

      } else {
        this.numFollowers--
        this.followUnfollowMessage = "Follow";
      }
    })
  }


  goToUserPage(followerId: any){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',followerId, 'timeline']);
    })
  }

}