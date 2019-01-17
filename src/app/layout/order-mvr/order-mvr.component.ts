import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {routerTransition} from "../../router.animations";
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Modal} from "ngx-modal/index";
import {EventService} from "../../core/services/event.service";

@Component({
    selector: 'app-order-mvr',
    templateUrl: './order-mvr.component.html',
    styleUrls: ['./order-mvr.component.scss'],
    animations: [routerTransition()]
})
export class OrderMvrComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    userId:any;
    orderList:any = [];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount:any = 0;
    isActive:any;
    activeTab : any = 'allOrder';
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    statusData : any = '';

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

    }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.mvrOrders();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('MVR Status');
        },50);
    }

    /*
     ** Changed Tab
     */
    changeTab(key) {
        switch (key) {
            case 'followUp':
                this.activeTab = 'followUp';
                this.statusData = 'is_need_follow_up';
                this.mvrOrders();
                break;

            case 'signedAuthorization':
                this.activeTab = 'signedAuthorization';
                this.statusData = 'is_need_sign_authority';
                this.mvrOrders();
                break;

            case 'nonInsurable':
                this.activeTab = 'nonInsurable';
                this.statusData = 'non_insurable';
                this.mvrOrders();
                break;

            case 'insurable':
                this.activeTab = 'insurable';
                this.statusData = 'is_insurable';
                this.mvrOrders();
                break;

            default :
                this.activeTab = 'allOrder';
                this.mvrOrders();
                this.statusData = '';
                break;
        }
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.mvrOrders();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.mvrOrders();
    }

    mvrOrders() {
        this.spinner.show();
        this.userService.mvrOrders(this.statusData, this.searchContent, this.pageNumber).subscribe(
            result => this.mvrOrdersSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }
    
    mvrOrdersSuccess(result) {
        if (result.success > 0) {
            this.orderList = [];
            if (result.data.order.data && (result.data.order.data.length > 0)) {
                this.totalCount = result.data.order.total;
                result.data.order.data.forEach(item => {
                    if (item.status == '1') {
                        item.status = 'Active';
                    } else {
                        item.status = 'Pending';
                    }
                    this.orderList.push(item);
                })
            } else {
                this.orderList = [];
            }
        }
        this.spinner.hide();
    }


    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.mvrOrders();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.mvrOrders();
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
