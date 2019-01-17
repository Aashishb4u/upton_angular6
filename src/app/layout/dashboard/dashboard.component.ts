import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {AppConstant} from "../../app.constant";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userId:any;

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {
    }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.getSpecificUser();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Dashboard');
        },50);
    }

    /*
     * Get the Specific User
     */
    getSpecificUser() {
        this.userService.getSpecificUser(this.userId).subscribe(
            result => this.getSpecificUserSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificUserSuccess(result) {
        if (result.success > 0) {
            console.log(result);
        }
        this.spinner.hide();
    }

    /*
     * Handled the Error Method
     */
    HandleError(errorResponse) {
        if (errorResponse.data && errorResponse.data.message) {
            this.toastr.error(errorResponse.data.message);
        } else {
            this.toastr.error(AppConstant.SERVER_ERROR);
        }
        this.spinner.hide();
    }
}
