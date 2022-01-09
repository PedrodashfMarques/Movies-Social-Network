import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth-service/auth.service';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
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

  private allSubscriptions = new Subscription();

  constructor(
    private myAuthService: AuthService,
    private myUserActions: UserActionsService
  ) { }
  

  ngOnInit(): void {
    this.allSubscriptions.add(this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    }))
    this.getUsers();
  }

  getUsers(){
    this.allSubscriptions.add(this.myUserActions.getAllUsers().subscribe(allUsers => {
      this.usersFoundArray = allUsers;
      if(this.usersFoundArray.length <= 0){
        this.noUsersFound = true;

      } else {
        this.noUsersFound = false;
      }
    }))
  }

  pesquisarUsername(){
    let userNameAPesquisar = this.userNameSearch.nativeElement.value.toLowerCase();

    let formData = new FormData();
    formData.append('userNameSearch', userNameAPesquisar);

    this.allSubscriptions.add(this.myUserActions.findUser(formData).subscribe(response => {
      this.usersFoundArray = response;

      if(this.usersFoundArray.length <= 0){
        this.noUsersFound = true;

      } else {
        this.noUsersFound = false;
      }
    }))
    
  }

  makeModerator(userId){
    let makeUserAdmin = this.makeUserAdmin.nativeElement.value.toLowerCase();
    
    let formData = new FormData();

    formData.append("user_id", userId);

    this.allSubscriptions.add(this.myUserActions.giveRemoveMod(formData).subscribe(response => {
      console.log(response);
      if(response["moderator"] === true){
        this.userIsAdmin = true;

      } else{
        this.userIsAdmin = false;

      }
    }))
    
  }

  // Argumento Opcional
  openCloseModal(userId?){
    this.openDeleteModal = !this.openDeleteModal;
    this.userIdToDelete = userId;
  }

  deleteUser(){
    this.allSubscriptions.add(this.myUserActions.deleteUser(this.userIdToDelete).subscribe(response => {
      this.openDeleteModal = !this.openDeleteModal;
      setTimeout(() => {
        this.getUsers();
      }, 100);

    }))
  }

  ngOnDestroy(): void {
      this.allSubscriptions.unsubscribe();
  }

}
