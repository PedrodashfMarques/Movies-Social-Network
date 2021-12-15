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

  bootcamp: string = "https://images8.alphacoders.com/926/thumb-1920-926492.jpg";

  userIsVerified: boolean = true;
  
  // Rotas Ativas
  timelineClicked: boolean = false;
  aboutClicked: boolean = false;
  groupsClicked: boolean = false;
  imagesClicked: boolean = false;

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute,
    private myUserActions: UserActionsService
    ) {}


  ngOnInit(): void {
     this.idDoUser = +this.myActiveRoute.snapshot.params['id'];

    console.log(this.idDoUser);

    this.myUserActions.getUserData(this.idDoUser).subscribe(response => {
      console.log(response);
    });


    this.showTimeline();
    // no iniciar do componente, vai ter que ter aqui uma property do tipo connectedUser que contém vários dados vindos de um service, de um subject (Auth.service.ts)
  }

  showTimeline(){
    this.myRouter.navigate(['timeline'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = true;
    this.aboutClicked = false;
    this.groupsClicked = false;
    this.imagesClicked = false;
  }
  
  showAboutComponent(){
    this.myRouter.navigate(['about'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = true;
    this.groupsClicked = false;
    this.imagesClicked = false;
  }

  showGroupsComponent(){
    this.myRouter.navigate(['groups'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = false;
    this.groupsClicked = true;
    this.imagesClicked = false;
  }

  showImagesComponent(){
    this.myRouter.navigate(['images'], {relativeTo: this.myActiveRoute});

    this.timelineClicked = false;
    this.aboutClicked = false;
    this.groupsClicked = false;
    this.imagesClicked = true;
  }

  fetchConnectedUserData(){
    // ..........
    console.log("Hello");

  }




}