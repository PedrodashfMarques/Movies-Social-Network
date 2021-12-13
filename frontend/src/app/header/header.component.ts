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

  constructor(
    private myFormBuilder: FormBuilder, 
    private myAuthService: AuthService,
    private myRouter: Router
    ) { }

  ngOnInit(): void {
    
    console.log("Este é o header component a funcionar");

    this.userFezLogin = true;

    this.userFezLogout = false;
    
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

}
