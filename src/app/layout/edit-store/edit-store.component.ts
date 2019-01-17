import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {EmailValidator} from "../../shared/theme/validators/email.validator";
import {AppConstant} from "../../app.constant";
import {Helper} from "../../core/helpers/helper";

@Component({
    selector: 'app-edit-store',
    templateUrl: './edit-store.component.html',
    styleUrls: ['./edit-store.component.scss'],
})
export class EditStoreComponent implements OnInit {
    franchiseId:any;
    stateGroupList:any[] = [];
    companyUserList:any = [];
    editStoreForm:FormGroup;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    id:any;

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private routes:ActivatedRoute,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.id = this.routes.snapshot.queryParams['id'];
        this.franchiseId = Helper.getFranchiseId();

        /**
         *  Manage Store Form
         */
        this.editStoreForm = this.fb.group({
            'companyName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],

            'storeNumber': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'storeAddress': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'state': ['', Validators.compose([Validators.required])],
            'city': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'zip': ['', Validators.compose([Validators.required])],
            'phoneNumber': ['', Validators.compose([Validators.required])],

            // 'managerFirstName': [''],
            // 'managerLastName': [''],
            // 'managerEmail': [''],
            // 'managerPhoneNumber': [''],

            'contactFirstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'contactLastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'contactEmail': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'contactPhoneNumber': [''],
            'contactPosition': [''],
        });

        this.getCompanyList();
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    ngOnInit() {
        window.scroll(0, 0);
        this.getSpecificStore();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit Store');
        },50);
    }
    
    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.editStoreForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Get the company List
     */
    getCompanyList() {
        this.spinner.show();
        this.userService.getCompanyList(this.franchiseId).subscribe(
            result => this.getCompanyListSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getCompanyListSuccess(result) {
        if (result.success > 0) {
            this.companyUserList = [];
            if (result.data.company_data && (result.data.company_data.length > 0)) {
                result.data.company_data.forEach(item => {
                    this.companyUserList.push(item);
                });
            } else {
                this.companyUserList = [];
            }
        }
        this.spinner.hide();
    }

    /**
     *  Get the specific store details
     */
    getSpecificStore() {
        this.spinner.show();
        this.userService.getSpecificStore(this.id).subscribe(
            result => this.getSpecificStoreSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificStoreSuccess(result) {
        if (result.success > 0) {
            this.editStoreForm.controls['companyName'].setValue(result.data.store.company_id);
            this.editStoreForm.controls['storeNumber'].setValue(result.data.store.store_number);
            this.editStoreForm.controls['storeAddress'].setValue(result.data.store.address);
            this.editStoreForm.controls['state'].setValue(result.data.store.state);
            this.editStoreForm.controls['city'].setValue(result.data.store.city);
            this.editStoreForm.controls['zip'].setValue(result.data.store.zip);
            this.editStoreForm.controls['phoneNumber'].setValue(result.data.store.phone);

            // this.editStoreForm.controls['managerFirstName'].setValue(result.data.store.manager_fname);
            // this.editStoreForm.controls['managerLastName'].setValue(result.data.store.manager_lname);
            // this.editStoreForm.controls['managerEmail'].setValue(result.data.store.manager_email);
            // this.editStoreForm.controls['managerPhoneNumber'].setValue(result.data.store.manager_contact_number);

            this.editStoreForm.controls['contactFirstName'].setValue(result.data.store.contact_person_fname);
            this.editStoreForm.controls['contactLastName'].setValue(result.data.store.contact_person_lname);
            this.editStoreForm.controls['contactEmail'].setValue(result.data.store.contact_person_email);
            this.editStoreForm.controls['contactPhoneNumber'].setValue(result.data.store.contact_person_contact_number);
            this.editStoreForm.controls['contactPosition'].setValue(result.data.store.position);
        }
        this.spinner.hide();
    }


    /**
     *  Save the editStoreForm Details
     */
    onSubmit(userData) {
        if (userData.phoneNumber === '000-000-0000' || userData.phoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (userData.zip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else if(userData.contactPhoneNumber === '000-000-0000' || userData.contactPhoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else {
            this.spinner.show();
            let submitData = {
                "company_id": userData.companyName,
                "store_number": userData.storeNumber,
                "phone": userData.phoneNumber,
                "address": userData.storeAddress,
                "city": userData.city,
                "state": userData.state,
                "zip": userData.zip,

                // "manager_fname": userData.managerFirstName,
                // "manager_lname": userData.managerLastName,
                // "manager_email": userData.managerEmail,
                // "manager_contact_number": userData.managerPhoneNumber,

                "contact_person_fname": userData.contactFirstName,
                "contact_person_lname": userData.contactLastName,
                "contact_person_contact_number": userData.contactPhoneNumber,
                "contact_person_email": userData.contactEmail,
                "position": userData.contactPosition
            };

            this.userService.updateStore(submitData, this.id).subscribe(
                result => this.updateStoreSuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    updateStoreSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['manage-store']);
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
