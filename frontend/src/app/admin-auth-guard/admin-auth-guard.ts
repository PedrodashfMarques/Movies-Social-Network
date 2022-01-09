import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../auth-service/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate{

    constructor(
        private myAuthService: AuthService,
        private myRouter: Router
        ){}

        canActivate(): boolean | Promise<boolean> | Observable<boolean | UrlTree> {

            return  this.myAuthService.userSubject.pipe( take(1), map( user => {
                const isAuthenticated = !!user;

                if(isAuthenticated){
                    let isAdmin = Number(user.isAdmin);

                    if(isAdmin === 1){
                        return true

                    }
                    
                }
                return this.myRouter.createUrlTree(["newsfeed"]);

            }))
        }
        
    
}