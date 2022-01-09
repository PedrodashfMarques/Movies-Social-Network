import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuAberto: boolean = false;

  userFezLogin: boolean;

  userFezLogout: boolean;

  connectedUserId;

  isAdmin: any;

  private endSubscription = new Subscription();

  constructor(
    private myAuthService: AuthService,
    private myRouter: Router
    ) { }

  ngOnInit(): void {
    this.endSubscription.add(this.myAuthService.userSubject.subscribe(data => {
      this.connectedUserId = data.userId;
      this.isAdmin = data.isAdmin;
    }))

  }

  abreMenu(): void{
    this.menuAberto = !this.menuAberto;
  }

  escondeMenu(): void {
    this.menuAberto = false;
  }

  
  onLogout(){
      this.myAuthService.logoutUser();
      setTimeout(() => {
      this.myRouter.navigate(['']);
        
      },100);
  }

  goToConnectedUserPage(){
    this.myRouter.navigateByUrl('/profile', {skipLocationChange: true})
    .then(()=>{
        this.myRouter.navigate(['/profile/',this.connectedUserId, 'timeline']);
    })
  }
  
  ngOnDestroy(): void {
      this.endSubscription.unsubscribe();
  }
}
