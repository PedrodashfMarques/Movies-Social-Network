import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {
  @ViewChild('postContent') postContentSearch: ElementRef;


  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";;

  userIsVerified: boolean = true;

  postsFoundArray: any = [];

  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  constructor(
    private myUserActions: UserActionsService,
    private myRouter: Router,
  ) { }

  ngOnInit(): void {
    this.myUserActions.getAllPosts().subscribe(data => {
      this.postsFoundArray = data;
      console.log(this.postsFoundArray);
    })
  }

  pesquisarPost(){
    let postContentAPesquisar: string = this.postContentSearch.nativeElement.value.toLowerCase();
    
    let formData = new FormData();

    formData.append('postContentSearch', postContentAPesquisar);

    this.myUserActions.findPost(formData).subscribe(data => {
      this.postsFoundArray = data;
      console.log(data)
    })
  }


}
