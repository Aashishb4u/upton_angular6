import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Modal} from "ngx-modal/index";
import {EventService} from "../../core/services/event.service"
import {AppConstant} from "../../app.constant";

@Component({
    selector: 'app-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    userId:any;
    // franchiseId:any;
    franchiseUserList:any = [];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount:any = 0;
    active_inactive:any = '';
    selectedOption:any;
    deletePostId:any;
    activeInactiveId:any;
    isActive:any;
    @ViewChild('myModal') myModal:Modal;
    @ViewChild('activeInactiveModal') activeInactiveModal:Modal;

    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

    }

    ngOnInit() {
        this.selectedOption = '';
        this.userId = localStorage.getItem('userId');
        // this.franchiseId = localStorage.getItem('franchiseId');
        this.getFranchiseUser();
    }

    ngAfterViewInit() {
        setTimeout(()=> {
            this.eventService.setChangedContentToptext('Manage Users');
        }, 50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.getFranchiseUser();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.getFranchiseUser();
    }

    /**
     *  Get Franchise User
     */
    getFranchiseUser() {
        this.spinner.show();
        this.userService.getFranchiseUser(this.userId, this.searchContent, this.active_inactive, this.pageNumber).subscribe(
            result => this.getFranchiseUserSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getFranchiseUserSuccess(result) {
        if (result.success > 0) {
            this.franchiseUserList = [];
            if (result.data[0].data && (result.data[0].data.length > 0)) {
                this.totalCount = result.data[0].total;
                result.data[0].data.forEach(item => {
                    if (item.status == '1') {
                        item.status = 'Active';
                    } else {
                        item.status = 'In-Active';
                    }
                    this.franchiseUserList.push(item);
                })
            } else {
                this.franchiseUserList = [];
            }
        }
        this.spinner.hide();
    }

    // Route it to the Edit User page
    editUser(event) {
        this.router.navigate(['users/edit-user'], {queryParams: {id: event.id}});
    }

    /**
     *  Delete Specific User Records
     */
    deleteUser(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();
    }

    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificFranchise(this.deletePostId).subscribe(
            result => this.deleteSpecificFranchiseSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    deleteSpecificFranchiseSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.getFranchiseUser();
        }
        this.spinner.hide();
    }

    /**
     *  Update the Active-Inactive Status
     */
    activeInactive(event) {
        this.activeInactiveId = '';
        this.activeInactiveId = event.id;

        if (event.status === 'Active') {
            this.isActive = '0';
        }
        if (event.status === 'In-Active') {
            this.isActive = '1';
        }
        this.activeInactiveModal.open();
    }

    confirmActivateDeactivate() {
        this.spinner.show();
        let data = {
            "status": this.isActive,
        };
        this.userService.activeInactiveUser(data, this.activeInactiveId).subscribe(
            result => this.activeInactiveUserSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    activeInactiveUserSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.activeInactiveModal.close();
            this.getFranchiseUser();
        }
        this.spinner.hide();
    }

    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.getFranchiseUser();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.getFranchiseUser();
    }

    /*
     * To apply the sorting on the
     * */
    selectList(event) {
        this.pageNumber = 1;
        let status = event.target.value;
        if (status == '') {
            this.active_inactive = '';
            this.getFranchiseUser();
        } else if (status == 'active') {
            this.active_inactive = '1';
            this.getFranchiseUser();
        } else if (status == 'inactive') {
            this.active_inactive = '0';
            this.getFranchiseUser();
        }
    }

    /**
     *  Handled the Error Method
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
