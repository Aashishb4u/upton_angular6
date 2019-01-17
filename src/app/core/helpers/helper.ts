import {Injectable} from '@angular/core';

@Injectable()
export class Helper {


    static getApiKey() {
        let apiKey = 'fYsd4AW5pKz9_uV';
        return apiKey;
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');

    }

    static getRole() {
        return localStorage.getItem('role');

    }

    static isLoggedIn() {
        let token = this.getToken();
        if (token && token.length > 0) {
            return true;
        }
        return false;
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }
    static getFranchiseId() {
        return localStorage.getItem('franchiseId');
    }

    static isFranchise() {
        if(this.getRole() === 'franchise') {
            return true
        } else {
            return false;
        }
    }
}
