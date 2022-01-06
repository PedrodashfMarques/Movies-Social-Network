import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('userNameAPesquisar') userNameSearch: ElementRef;
  @ViewChild('makeUserAdmin') makeUserAdmin: ElementRef;


  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";

  userIsAdmin: boolean = false;

  usersFoundArray: any = [];

  noUsersFound: boolean;

  connectedUserId: number;

  openDeleteModal: boolean = false;

  userIdToDelete: number;


  constructor(
    private myAuthService: AuthService,
    private myUserActions: UserActionsService,
    private myRouter: Router,
  ) { }
  

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    })
    this.getUsers();
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
      console.log(response);
      this.usersFoundArray = response;

      if(this.usersFoundArray.length <= 0){
        this.noUsersFound = true;

      } else {
        this.noUsersFound = false;
      }
    })
    
  }

  makeModerator(userId){
    let makeUserAdmin = this.makeUserAdmin.nativeElement.value.toLowerCase();
    
    let formData = new FormData();

    formData.append("user_id", userId);

    this.myUserActions.giveRemoveMod(formData).subscribe(response => {
      console.log(response);
      if(response["moderator"] === true){
        this.userIsAdmin = true;

      } else{
        this.userIsAdmin = false;

      }

    })
    
  }

  // Argumento Opcional
  openCloseModal(userId?){
    this.openDeleteModal = !this.openDeleteModal;
    this.userIdToDelete = userId;
  }

  deleteUser(){
    this.myUserActions.deleteUser(this.userIdToDelete).subscribe(response => {
      this.openDeleteModal = !this.openDeleteModal;
      // console.log(response);

      setTimeout(() => {
        this.getUsers();
      }, 100);


      
    })
  }

}
