import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {Modal} from "ngx-modal/index";
import {EventService} from "../../core/services/event.service";
import {Helper} from "../../core/helpers/helper";

@Component({
    selector: 'app-manage-store',
    templateUrl: './manage-store.component.html',
    styleUrls: ['./manage-store.component.scss'],
})
export class ManageStoreComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    franchiseId:any;
    franchiseStoreList:any = [];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount:any = 0;
    deletePostId:any;
    @ViewChild('myModal') myModal:Modal;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

    }

    ngOnInit() {
        this.franchiseId = Helper.getFranchiseId();
        this.getFranchiseStoreDetails();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Manage Stores');
        },50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.getFranchiseStoreDetails();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.getFranchiseStoreDetails();
    }

    /**
     *  Get Franchise Store Details
     */
    getFranchiseStoreDetails() {
        this.spinner.show();
        this.userService.getFranchiseStoreDetails(this.franchiseId, this.searchContent, this.pageNumber, this.perPage).subscribe(
            result => this.getFranchiseStoreDetailsSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getFranchiseStoreDetailsSuccess(result) {
        if (result.success > 0) {
            this.franchiseStoreList = [];
            if (result.data.store.data && (result.data.store.data.length > 0)) {
                this.totalCount = result.data.store.total;
                result.data.store.data.forEach(item => {
                    this.franchiseStoreList.push(item);
                })
            } else {
                this.franchiseStoreList = [];
            }
        }
        this.spinner.hide();
    }

    // Route it to the Edit User page
    editStore(event) {
        this.router.navigate(['manage-store/edit-store'], {queryParams: {id: event.id}});
    }

    /**
     *  Delete the store records
     */
    deleteStore(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();
    }

    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificStore(this.deletePostId).subscribe(
            result => this.deleteSpecificStoreSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    deleteSpecificStoreSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.getFranchiseStoreDetails();
        }
        this.spinner.hide();
    }

    /**
     *  Pagination Event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.getFranchiseStoreDetails();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.getFranchiseStoreDetails();
    }

    /**
     *  Handled the Error method
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
