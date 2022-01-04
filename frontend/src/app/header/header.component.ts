import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuAberto: boolean = false;

  userFezLogin: boolean;

  userFezLogout: boolean;

  connectedUserId;

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router
    ) { }

  ngOnInit(): void {
    this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
    })

  }

  abreMenu(): void{
    this.menuAberto = !this.menuAberto;
  }

  escondeMenu(): void {
    this.menuAberto = false;
  }

  
  onLogout(){
      this.myAuthService.logoutUser();
      this.myRouter.navigate(['']);
  }

  goToConnectedUserPage(){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }

}
