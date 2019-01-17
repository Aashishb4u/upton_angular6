import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from "../../shared/theme/validators/email.validator";
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {AppConstant} from "../../app.constant";
import {Helper} from "../../core/helpers/helper";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
    franchiseId:any;
    stateGroupList:any[] = [];
    userForm:FormGroup;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    companyList:any = [];
    storeList:any = [];
    dropdownSettings: any = {};
    storeSettings: any = {};

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        /**
         *  Basic userForm
         */
        this.userForm = this.fb.group({
            'firstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'lastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'email': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'role': ['franchise_user', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
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
        this.spinner.hide();
        this.franchiseId = Helper.getFranchiseId();
        this.getCompanyStoreList();
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

    ngAfterViewInit() {
        setTimeout(()=> {
            this.eventService.setChangedContentToptext('Add User');
        }, 50);
    }

    onItemSelect(item:any){}
    
    OnItemDeSelect(item:any){}
    
    onSelectAll(items: any){}
    
    onDeSelectAll(items: any){
        console.log(items);
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.userForm.valid) {
            return false;
        } else {
            return true;
        }
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
     *  Save the UserForm Details
     */
    onSubmit(userData) {
        console.log('userData is', userData);
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

            this.userService.addUser(submitData).subscribe(
                result => this.addUserSuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    addUserSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['users']);
        }
        this.spinner.hide();
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
