import { Component, OnChanges, OnInit } from '@angular/core';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  userIsVerified: any = false;
  mensagem: string = "Posted November 8th, 2021 at 17h28";
  likes: number = 0;


  // Post Content

  userPostsArray: [];

    // firstName: string
    // username: string
    // lastName: string
    // userImage: string
    // isVerified: number
    // postId: number
    // createdAt: Date
    // postContent
  // Post Content


  constructor(private myUserActions: UserActionsService) {}

  ngOnInit(): void {
    this.myUserActions.allUserData.subscribe(data => {
      this.userPostsArray = data[0].userPosts;

      let userVerification = data[0].userData.is_verified;

      console.log(userVerification)

      if(userVerification === 1 || userVerification === "1"){
        this.userIsVerified = true;
      } else {
        this.userIsVerified = false
      }

      // console.log(this.userPostsArray);
      
    })
  }


}
