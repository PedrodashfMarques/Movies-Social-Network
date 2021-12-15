import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {
  
  usersRouteClicked: boolean = false;

  postsRouteClicked: boolean = false;

  constructor(
    private myRouter: Router, 
    private myActiveRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.showUsersFilter();
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

}
