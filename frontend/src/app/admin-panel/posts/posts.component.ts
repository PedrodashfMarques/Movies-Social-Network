import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private myAuthService: AuthService,
    private myUserActions: UserActionsService,
    private myRouter: Router
  ) { }

  ngOnInit(): void {
  }


  pesquisarPost(){

  }

}
