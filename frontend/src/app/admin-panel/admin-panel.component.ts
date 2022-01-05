import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  connectedUserId: number;

  usersRouteClicked: boolean = false;
  postsRouteClicked: boolean = false;
  statsRouteClicked: boolean = false;

  constructor( 
    private myAuthService: AuthService,
    private myRouter: Router,
    private myActiveRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    })

  }

  showUsers(){
    this.myRouter.navigate(["users"], {relativeTo: this.myActiveRoute});
    this.usersRouteClicked = true;
    this.postsRouteClicked = false;
    this.statsRouteClicked = false;
  }

  showPosts(){
    this.myRouter.navigate(["posts"], {relativeTo: this.myActiveRoute});
    this.postsRouteClicked = true;
    this.usersRouteClicked = false;
    this.statsRouteClicked = false;

  }

  showStats(){
    this.myRouter.navigate(["stats"], {relativeTo: this.myActiveRoute});
    this.statsRouteClicked = true;
    this.usersRouteClicked = false;
    this.postsRouteClicked = false;
  }


  goToConnectedUserPage(){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }


}
