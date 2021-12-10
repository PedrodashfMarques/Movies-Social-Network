import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  estaAutenticado: boolean = false;

  constructor(private myAuthService: AuthService){}

  userLogado: boolean;

  ngOnInit(){
    this.userLogado = false;
    
    this.myAuthService.userLoggedIn.subscribe((data: boolean) => {
      this.userLogado = data;
    })

  }

}
