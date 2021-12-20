import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../auth-service/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(
        private myAuthService: AuthService,
        private myRouter: Router
        ){}

        canActivate(): boolean | Promise<boolean> | Observable<boolean |UrlTree> {
            return this.myAuthService.userSubject.pipe( take(1), map( user => {
                const isAuthenticated = !!user; // !! user faz uma conversão do valor obtido desde que seja true, por ex (objeto, string, number) qq coisa que não seja null ou undefined

                if(isAuthenticated){
                    return true
                }
                return this.myRouter.createUrlTree([""]);
            }))
        }
        
    
}