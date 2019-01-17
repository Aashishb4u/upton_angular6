import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Modal} from "ngx-modal/index";
import {EventService} from "../../core/services/event.service";

@Component({
    selector: 'app-manage-driver',
    templateUrl: './manage-driver.component.html',
    styleUrls: ['./manage-driver.component.scss'],
})
export class ManageDriverComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    userId: any;
    franchiseDriverList:any = [];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount: any = 0;
    deletePostId:any;
    activeInactiveId:any;
    isActive: any;
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
         this.userId = localStorage.getItem('userId');
         this.getFranchiseDriverList();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Manage Drivers');
        },50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.getFranchiseDriverList();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.getFranchiseDriverList();
    }

    /**
     *  Get Franchise Driver List
     */
    getFranchiseDriverList() {
        this.spinner.show();
        this.userService.getFranchiseDriverList(this.userId, this.searchContent, this.pageNumber, this.perPage).subscribe(
            result => this.getFranchiseDriverListSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }
    
    getFranchiseDriverListSuccess(result) {
        if(result.success > 0) {
            this.franchiseDriverList = [];
            if(result.data.driver.data && (result.data.driver.data.length > 0)) {
                this.totalCount = result.data.driver.total;
                result.data.driver.data.forEach(item => {
                    if(item.status == '1') {
                        item.status = 'Active';
                    }else {
                        item.status = 'In-Active';
                    }
                    this.franchiseDriverList.push(item);
                })
            }else {
                this.franchiseDriverList = [];
            }
        }
        this.spinner.hide();
    }

    // Route it to the Edit Driver page
    editDriver(event) {
         this.router.navigate(['manage-driver/edit-driver'], {queryParams: {id: event.id}});
    } 
    
    // Route it to the Manage Vehicle page
    manageVehicle(event) {
         this.router.navigate(['manage-vehicle'], {queryParams: {driverId: event.id}});
    }

    /**
     *  Delete the Driver records
     */
    deleteDriver(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();
    }
    
    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificDriver(this.deletePostId).subscribe(
            result => this.deleteSpecificFranchiseSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }
    
    deleteSpecificFranchiseSuccess(result) {
        if(result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.getFranchiseDriverList();
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
        this.userService.activeInactiveDriver(data, this.activeInactiveId).subscribe(
            result => this.activeInactiveDriverSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    activeInactiveDriverSuccess(result) {
        if(result.success > 0) {
            this.toastr.success(result.data.message);
            this.activeInactiveModal.close();
            this.getFranchiseDriverList();
        }
        this.spinner.hide();
    }


    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.getFranchiseDriverList();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.getFranchiseDriverList();
    }

    /**
     *  Order MVR 
     */
    orderMvr(driverData) {
        let mvrData = {
            'driver_id' : driverData.id
        };

        this.userService.orderMvr(mvrData).subscribe(
            result => this.orderMvrSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    orderMvrSuccess(result) {
        if(result.success > 0) {
            this.toastr.success(result.data.message);
            this.getFranchiseDriverList();
        }
        this.spinner.hide();
    }

    manageFile(event) {
        this.router.navigate(['manage-file'], {queryParams: {driverId: event.id}});
    }

    /**
     *  Handled Error Method
     */
    HandleError(errorResponse) {
        if (errorResponse.data && errorResponse.data.message) {
            this.toastr.error(errorResponse.data.message);
        } else {
            this.toastr.error('Server error');
        }
        this.spinner.hide();
    }
}
