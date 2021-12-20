import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.showUsersFilter();
  }

  showUsersFilter(){
    this.myRouter.navigate(["users"], {relativeTo: this.myActiveRoute});
    this.usersRouteClicked = true;
    this.postsRouteClicked = false;
  }

  // showPostsFilter(){
  //   this.myRouter.navigate(["posts"], {relativeTo: this.myActiveRoute});
  //   this.postsRouteClicked = true;
  //   this.usersRouteClicked = false;
  // }

  pesquisarUsername(){
    let userNameAPesquisar = this.userNameSearch.nativeElement.value.toLowerCase();

    console.log(userNameAPesquisar)
  }

}
