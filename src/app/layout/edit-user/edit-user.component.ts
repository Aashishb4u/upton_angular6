import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from "../../shared/theme/validators/email.validator";
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {AppConstant} from "../../app.constant";
import {Helper} from "../../core/helpers/helper";

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
    franchiseId:any;
    stateGroupList:any[] = [];
    userEditForm:FormGroup;
    id:any;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    companyList:any = [];
    storeList:any = [];
    selectedItems: any = [];
    selectedStoreItems: any = [];
    dropdownSettings: any = {};
    storeSettings: any = {};

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private routes:ActivatedRoute,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.id = this.routes.snapshot.queryParams['id'];

        /**
         *  Basic userEditForm Form
         */
        this.userEditForm = this.fb.group({
            'firstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'lastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate, BlankSpaceValidator.validate])],
            'role': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'phoneNumber': [''],
            'state': [''],
            'city': [''],
            'address': [''],
            'zip': [''],
            'companyStoreDetails': [[]],
        });
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    ngOnInit() {
        this.franchiseId = Helper.getFranchiseId();
        this.getCompanyStoreList();
        this.getSpecificFranchise();

        this.dropdownSettings = {
            singleSelection: false,
            text:"Select Companies",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            classes:"myclass custom-class c-btn",
            position: 'top'
        };

        this.storeSettings = {
            singleSelection: false,
            text:"Select Stores",
            selectAllText:'Select All',
            unSelectAllText:'UnSelect All',
            enableSearchFilter: true,
            classes:"myclass custom-class c-btn",
            position: 'top'
        };
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit User');
        },50);
    }

    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

    /**
     *  Fetched the Company and Store list
     */
    getCompanyStoreList() {
        this.spinner.show();
        this.userService.getCompanyStore(this.franchiseId).subscribe(
            result => this.getCompanyStoreSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );

    }

    getCompanyStoreSuccess(result) {
        if (result.success > 0) {
            if(result.data.company_details && result.data.company_details.length > 0) {
                result.data.company_details.forEach(item => {
                    this.companyList.push(item);
                })
            }else {
                this.companyList = [];
            }
            if(result.data.store_details && result.data.store_details.length > 0) {
                result.data.store_details.forEach(item => {
                    this.storeList.push(item);
                })
            }else {
                this.storeList = [];
            }
        }
        this.spinner.hide();
    }

    /**
     *  Get Specific Franchise
     */
    getSpecificFranchise() {
        this.spinner.show();
        this.userService.getSpecificFranchise(this.id).subscribe(
            result => this.getSpecificFranchiseSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificFranchiseSuccess(result) {
        if (result.success > 0) {
            this.userEditForm.controls['firstName'].setValue(result.data.user_data.first_name);
            this.userEditForm.controls['lastName'].setValue(result.data.user_data.last_name);
            this.userEditForm.controls['email'].setValue(result.data.user_data.email);
            this.userEditForm.controls['role'].setValue(result.data.user_data.role.role);
            this.userEditForm.controls['phoneNumber'].setValue(result.data.user_data.phone);
            this.userEditForm.controls['state'].setValue(result.data.user_data.state);
            this.userEditForm.controls['city'].setValue(result.data.user_data.city);
            this.userEditForm.controls['address'].setValue(result.data.user_data.address);
            this.userEditForm.controls['zip'].setValue(result.data.user_data.zip);
            if(result.data.company_list && result.data.company_list.length > 0) {
                console.log('company_list');
                this.selectedItems = [];
                this.selectedItems = result.data.company_list;
                // this.userEditForm.controls['companyStoreDetails'].setValue(result.data.company_list);
            }else if(result.data.store_list && result.data.store_list.length > 0) {
                console.log('store list');
                this.selectedItems = [];
                this.selectedItems = result.data.store_list;
                // this.userEditForm.controls['companyStoreDetails'].setValue(result.data.store_list);
            }else {
                this.selectedItems = [];
            }
        }
        this.spinner.hide();
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.userEditForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the userEditForm Details
     */
    onSubmit(userData) {
        if (userData.phoneNumber === '000-000-0000' || userData.phoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (userData.zip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else {
            this.spinner.show();
            let submitData = {
                'first_name': userData.firstName.trim(),
                'last_name': userData.lastName.trim(),
                'email': userData.email,
                'role': userData.role,
                'phone': userData.phoneNumber,
                'address': userData.address,
                'city': userData.city,
                'state': userData.state,
                'zip': userData.zip,
                'company_store_list': userData.companyStoreDetails,
            };

            this.userService.updateUser(submitData, this.id).subscribe(
                result => this.updateUserSuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    updateUserSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['users']);
        }
        this.spinner.hide();
    }

    updateRole(event) {
        console.log('event is', event);
        this.selectedItems = [];
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
