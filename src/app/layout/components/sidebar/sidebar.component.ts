import {Component, Output, EventEmitter} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from "../../../core/services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AppConstant} from "../../../app.constant";
import {Helper} from "../../../core/helpers/helper";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive:boolean = false;
    collapsed:boolean = false;
    showMenu:string = '';
    pushRightClass:string = 'push-right';
    isFranchise: boolean = false;
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(public router:Router,
                private toastr:ToastrService,
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
        this.isFranchise = Helper.isFranchise();
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element:any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    /*
     * Handled the Error Method
     */
    // HandleError(errorResponse) {
    //     if (errorResponse.data && errorResponse.data.message) {
    //         this.toastr.error(errorResponse.data.message);
    //     } else {
    //         this.toastr.error('Server error');
    //     }
    //     this.spinner.hide();
    // }
}
