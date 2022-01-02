import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../shared/user.model';
import { UserActionsService } from '../user-actions/user-actions.service';


@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {
  @ViewChild('userName') userNameSearch: ElementRef;

  userIsVerified: boolean = true;

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  
  usersRouteClicked: boolean = false;

  postsRouteClicked: boolean = false;

  connectedUserId: number;


  // Users Array
  usersFoundArray: any = [];
  // Users Array

  // No users boolean
  noUsersFound: boolean;
  // No users boolean


  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService,
    private myAuthService: AuthService

    ) { }

  ngOnInit(): void {

    this.getUsers();

    this.showPostsFilter();

     this.myAuthService.userSubject.subscribe((data: User) => {
      this.connectedUserId = data.userId;
    })

  }

  showUsersFilter(){
    this.myRouter.navigate(["users"], {relativeTo: this.myActiveRoute});
    this.usersRouteClicked = true;
    this.postsRouteClicked = false;
  }

  showPostsFilter(){
    this.myRouter.navigate(["posts"], {relativeTo: this.myActiveRoute});
    this.postsRouteClicked = true;
    this.usersRouteClicked = false;
  }

  getUsers(){
    this.myUserActions.getAllUsers().subscribe(allUsers => {
      this.usersFoundArray = allUsers;
    })

  }

  pesquisarUsername(){
    let userNameAPesquisar = this.userNameSearch.nativeElement.value.toLowerCase();

    let formData = new FormData();
    formData.append('userNameSearch', userNameAPesquisar);

    this.myUserActions.findUser(formData).subscribe(response => {
      // console.log(response);
      this.usersFoundArray = response;

      // console.log(this.usersFoundArray);

      if(this.usersFoundArray.length <= 0){
        this.noUsersFound = true;

      } else {
        this.noUsersFound = false;

      }
    })
    
  }

  goToUserProfile(id: number){

    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',id, 'timeline']);
    })

  }


  goToConnectedUserPage(){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }

  
}