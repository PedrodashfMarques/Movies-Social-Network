import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuAberto: boolean = false;

  userFezLogin: boolean;

  userFezLogout: boolean;

  constructor(private myAuthService: AuthService, private myRouter: Router) { }

  ngOnInit(): void {
    
    console.log("Este é o header component a funcionar");

    this.userFezLogin = true;

    this.userFezLogout = false;

    this.myAuthService.userLoggedIn.subscribe((data: boolean) => {
      this.userFezLogin = data;
    })
    

  }

  abreMenu(): void{
    this.menuAberto = !this.menuAberto;
  }

  escondeMenu(): void {
    this.menuAberto = false;
  }

  
  onLogout(){
    this.userFezLogout = true;
    
    this.myAuthService.userLoggedOut.next(this.userFezLogout);
    
    setTimeout(() => {
      this.userFezLogin = false;
      this.myRouter.navigate(['']);
    }, 1200);
 
  }

}
