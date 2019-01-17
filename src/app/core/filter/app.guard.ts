import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Helper} from "../helpers/helper";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        if (Helper.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}


@Injectable()
export class PreLogin implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        if (!Helper.isLoggedIn()) {
            return true;
        } else {
            this.redirectToUser();
        }
    }

    redirectToUser() {
        this.router.navigate(['dashboard']);
    }
}
