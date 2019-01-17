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
import {AppConstant} from '../../app.constant'

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    userEditForm:FormGroup;
    id:any;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];

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
            'phoneNumber': [''],
            'state': [''],
            'city': [''],
            'address': [''],
            'zip': [''],
        });
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.getSpecificUser();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit Profile');
        },50);
    }

    /**
     *  Get Specific User Details
     */
    getSpecificUser() {
        this.spinner.show();
        this.userService.getSpecificUser(this.userId).subscribe(
            result => this.getSpecificUserSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificUserSuccess(result) {
        if (result.success > 0) {
            this.userEditForm.controls['firstName'].setValue(result.data.user_data.first_name);
            this.userEditForm.controls['lastName'].setValue(result.data.user_data.last_name);
            this.userEditForm.controls['email'].setValue(result.data.user_data.email);
            this.userEditForm.controls['phoneNumber'].setValue(result.data.user_data.phone);
            this.userEditForm.controls['state'].setValue(result.data.user_data.state);
            this.userEditForm.controls['city'].setValue(result.data.user_data.city);
            this.userEditForm.controls['address'].setValue(result.data.user_data.address);
            this.userEditForm.controls['zip'].setValue(result.data.user_data.zip);
        }
        this.spinner.hide();
    }

    /**
     *  Disable the User Edit Form
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
                'phone': userData.phoneNumber,
                'address': userData.address,
                'city': userData.city,
                'state': userData.state,
                'zip': userData.zip,
            };

            this.userService.updateUser(submitData, this.userId).subscribe(
                result => this.updateUserSuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    updateUserSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.eventService.setProfileData(result.data.user);
            this.router.navigate(['dashboard']);
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
