import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserActionsService } from 'src/app/user-actions/user-actions.service';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {
  @ViewChild('userName') userNameSearch: ElementRef;

  // userIsVerified: boolean = true;

  usersFoundArray: any = [];

  noUsersFound: boolean;

  imagemTeste: string = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/33/33fc65586f9b4615f95209a03398d8c8b2729f0b_full.jpg";
  
  
  imagesPath = "http://localhost/backend/";
  userProfileImage: string;
  imagemDefault = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";


  constructor(
    private myUserActions: UserActionsService
    ) { }

  ngOnInit(): void {
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

}
