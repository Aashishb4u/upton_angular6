import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EventService} from "../../../core/services/event.service";
import {UserService} from "../../../core/services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AppConstant} from "../../../app.constant";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass:string = 'push-right';
    userName:any = '';

    constructor(public router:Router,
                private toastr:ToastrService,
                private eventService:EventService,
                private userService:UserService,
                private spinner:NgxSpinnerService) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.userName = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
    }

    /*
     * To Update the user name and profile information to Header component,
     * when updated from other components like edit profile.
     * */
    ngAfterViewInit() {
        this.eventService.getProfileData().subscribe(item => {
            this.profileData(item);
        });

    }

    isToggled():boolean {
        const dom:Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom:any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom:any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.clear();
        this.router.navigate(['login']);
        this.toastr.success(AppConstant.LOGGED_OUT);
        // this.userService.logOut().subscribe(
        //     result => this.logOutSuccess(result),
        //     errorResponse => this.HandleError(errorResponse)
        // );
    }

    // logOutSuccess(result) {
    //     if (result.success > 0) {
    //         localStorage.clear();
    //         this.router.navigate(['login']);
    //         this.toastr.success(result.data.message);
    //     }
    //     this.spinner.hide();
    // }

    profileData(data) {
        this.userName = data.first_name + ' ' + data.last_name;
    }

    // /*
    //  * Handled the Error Method
    //  */
    // HandleError(errorResponse) {
    //     if (errorResponse.data && errorResponse.data.message) {
    //         this.toastr.error(errorResponse.data.message);
    //     } else {
    //         this.toastr.error('Server error');
    //     }
    //     this.spinner.hide();
    // }
}
