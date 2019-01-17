import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {Utility} from "../../shared/utility/utility";
import {Router,ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Modal} from "ngx-modal/index";
import {EventService} from "../../core/services/event.service";

@Component({
    selector: 'app-manage-vehicle',
    templateUrl: './manage-vehicle.component.html',
    styleUrls: ['./manage-vehicle.component.scss'],
})
export class ManageVehicleComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    userId:any;
    id:any;
    vehicleList:any = [];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount:any = 0;
    deletePostId:any;
    @ViewChild('myModal') myModal:Modal;
    @ViewChild('activeInactiveModal') activeInactiveModal:Modal;

    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService,
                private routes:ActivatedRoute) {

        this.id = this.routes.snapshot.queryParams['driverId'];

    }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.getVehicle();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Manage Vehicle');
        },50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.getVehicle();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.getVehicle();
    }

    /**
     *  Get Franchise User
     */
    getVehicle() {
        this.spinner.show();
        this.userService.getVehicle(this.id, this.searchContent, this.pageNumber).subscribe(
            result => this.getVehicleSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getVehicleSuccess(result) {
        if (result.success > 0) {
            this.vehicleList = [];
            if (result.data.vehicle.data && (result.data.vehicle.data.length > 0)) {
                this.totalCount = result.data.vehicle.total;
                result.data.vehicle.data.forEach(item => {
                    this.vehicleList.push(item);
                })
            } else {
                this.vehicleList = [];
            }
        }
        this.spinner.hide();
    }

    addVehicle() {
        this.router.navigate(['manage-vehicle/add-vehicle'], {queryParams: {driverId: this.id}});
    }

    // Route it to the Edit Vehicle page
    editVehicle(event) {
        this.router.navigate(['manage-vehicle/edit-vehicle'], {queryParams: {driverId: this.id, vehicleId: event.id}});
    }

    /**
     *  Delete Specific User Records
     */
    deleteVehicle(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();
    }

    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificVehicle(this.deletePostId).subscribe(
            result => this.deleteSpecificVehicleSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    deleteSpecificVehicleSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.getVehicle();
        }
        this.spinner.hide();
    }
    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.getVehicle();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.getVehicle();
    }

    /**
     *  Handled the Error Method
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
