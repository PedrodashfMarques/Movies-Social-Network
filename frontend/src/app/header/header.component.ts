import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuAberto: boolean = false;

  userFezLogin: boolean;

  userFezLogout: boolean;

  constructor(private myRouter: Router) { }

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
    this.userFezLogout = true;
    
    setTimeout(() => {
      this.userFezLogin = false;
      this.myRouter.navigate(['']);
    }, 1200);
 
  }

}
