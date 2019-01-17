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
    selector: 'app-manage-company',
    templateUrl: './manage-company.component.html',
    styleUrls: ['./manage-company.component.scss'],
})
export class ManageCompanyComponent implements OnInit {
    stateGroupList:any[] = [];
    searchContent:string = '';
    franchiseId:any;
    companyUserList:any = [];
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
        this.getCompanyUser();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Manage Companies');
        },50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.getCompanyUser();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.getCompanyUser();
    }

    /**
     *  Get Company User Details
     */
    getCompanyUser() {
        this.spinner.show();
        this.userService.getCompanyUser(this.franchiseId, this.searchContent, this.pageNumber).subscribe(
            result => this.getCompanyUserSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getCompanyUserSuccess(result) {
        if (result.success > 0) {
            this.companyUserList = [];
            if (result.data.company_data.data && (result.data.company_data.data.length > 0)) {
                this.totalCount = result.data.company_data.total;
                result.data.company_data.data.forEach(item => {
                    if (item.status == '1') {
                        item.status = 'Active';
                    } else {
                        item.status = 'In-Active';
                    }
                    this.companyUserList.push(item);
                })
            } else {
                this.companyUserList = [];
                // this.toastr.success('Data not Found');
            }
        }
        this.spinner.hide()
    }

    // Route it to the Edit Company page
    editCompany(event) {
        this.router.navigate(['manage-company/edit-company'], {queryParams: {id: event.id}});
    }

    /**
     *  Delete company records
     */
    deleteCompany(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();

    }

    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificCompany(this.deletePostId).subscribe(
            result => this.deleteSpecificCompanySuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    deleteSpecificCompanySuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.getCompanyUser();
        }
        this.spinner.hide();
    }

    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.getCompanyUser();
    }

    /**
     *  Set Page Limit Method
     */
    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.getCompanyUser();
    }

    /**
     *  Handled error method
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
