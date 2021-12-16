import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserActionsService } from '../user-actions/user-actions.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  imagemBackground: string = "https://steamuserimages-a.akamaihd.net/ugc/448490901519563018/1DBA511F88594E8E29FA8F1B56329CFD7B2DEC4E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";
  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";

  idDoUser: number;

  // USER DATA


    firstName: string
    username: string
    lastName: string
    location: string
    smallBio: string
    numFollowers: number
    numFollowing: number
 
  // USER DATA


  userIsVerified: boolean = false;
  
  // Rotas Ativas
  timelineClicked: boolean = false;
  aboutClicked: boolean = false;
  followersClicked: boolean = false;
  followingClicked: boolean = false;

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService
    ) {}

  ngOnInit(): void {
     this.idDoUser = +this.myActiveRoute.snapshot.params['id'];

    this.myUserActions.getUserData(this.idDoUser).subscribe(data => {
      this.firstName = data[0].userData.first_name;
      this.username = data[0].userData.username;
      this.lastName = data[0].userData.last_name;
      this.location = data[0].userData.location;
      this.smallBio = data[0].userData.small_bio;
      this.numFollowers = data[0].followersCount.Total;
      this.numFollowing = data[0].followingCount.Total;

      let userVerification = data[0].userData.is_verified;

      if(userVerification === 1 || userVerification === "1"){
        this.userIsVerified = true;
      } else {
        this.userIsVerified = false
      }
     
    });


    // this.myUserActions.allUserData.subscribe(responseData => {
    //   console.log(responseData); 
    // })

    this.showTimeline();
    // no iniciar do componente, vai ter que ter aqui uma property do tipo connectedUser que contém vários dados vindos de um service, de um subject (Auth.service.ts)
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

}