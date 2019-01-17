import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Errors, UserService} from '../core';
import {BlankSpaceValidator} from "../shared/theme/validators/BlankSpace.Validator";
import {EmailValidator} from "../shared/theme/validators/email.validator";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../shared/constants/state";
import {EqualPasswordsValidator} from "../shared/theme/validators/equalPasswords.validator";
import {Utility} from "../shared/utility/utility";
import {NgxSpinnerService} from 'ngx-spinner';
import {AppConstant} from "../app.constant";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.scss'],

})
export class RegisterComponent implements OnInit {
    title:String = '';
    errors:Errors = {errors: {}};
    registerForm:FormGroup;
    securityForm:FormGroup;
    billingForm:FormGroup;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    stateGroupList:any[] = [];
    setType:any = 'owner';
    regitserData:any;
    billingData:any;
    securityData:any;
    tab:any = {
        isOwnerDetailTab: {
            active: false,
            hasDone: false
        },
        isBillingTab: {
            active: false,
            hasDone: false
        },
        isSecurityTab: {
            active: false,
            hasDone: false
        }
    };

    constructor(private router:Router,
                private userService:UserService,
                private fb:FormBuilder,
                private toastr:ToastrService,
                private spinner:NgxSpinnerService) {

        this.tab['isOwnerDetailTab'].active = true;

        /**
         *  Basic Register Form
         */
        this.registerForm = this.fb.group({
            'firstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'lastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'franchiseeName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate, BlankSpaceValidator.validate])],
            'phoneNumber': [''],
            'state': [''],
            'city': [''],
            'address': [''],
            'zip': [''],
        });

        /**
         *  Billing Form
         */
        this.billingForm = this.fb.group({
            'billFirstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'billLastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'billEmail': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'billPhoneNumber': [''],
            'billState': [''],
            'billCity': [''],
            'billAddress': [''],
            'billZip': [''],
        });

        /**
         *  Security Form
         */
        this.securityForm = this.fb.group({
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'confirmPassword')})
        });

        this.setType = 'owner';
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    /**
     *  On Init
     */
    ngOnInit() {
        this.spinner.hide();
    }

    /**
     *  Disable the Register Form
     */
    disableSubmit() {
        if (this.registerForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Disable the Billing Form
     */
    disableBillSubmit() {
        if (this.billingForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Disable the Security Form
     */
    disableSecuritySubmit() {
        if (this.securityForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the Owner Details
     */
    onOwnerSubmit(registerData) {
        if (registerData.phoneNumber === '000-000-0000' || registerData.phoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (registerData.zip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else {
            this.regitserData = registerData;
            this.setType = 'billing';
            this.tab['isOwnerDetailTab'].active = false;
            this.tab['isOwnerDetailTab'].hasDone = true;
            this.tab['isBillingTab'].active = true;
        }
    }

    /**
     *  Back To Owner
     */
    back() {
        this.setType = 'owner';
        this.tab['isOwnerDetailTab'].active = true;
        this.tab['isOwnerDetailTab'].hasDone = false;
        this.tab['isBillingTab'].active = false;
    }

    /**
     *  Save the Billing Details
     */
    onBillingSubmit(billingData) {
        if (billingData.billPhoneNumber === '000-000-0000' || billingData.billPhoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (billingData.billZip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else {
            this.billingData = billingData;
            this.setType = 'security';
            this.tab['isSecurityTab'].active = true;
            this.tab['isBillingTab'].hasDone = true;
            this.tab['isOwnerDetailTab'].hasDone = true;
        }
    }

    /**
     *  Back To Billing
     */
    backToBilling() {
        this.setType = 'billing';
        this.tab['isBillingTab'].active = true;
        this.tab['isOwnerDetailTab'].hasDone = true;
        this.tab['isBillingTab'].hasDone = false;
        this.tab['isSecurityTab'].active = false;
    }

    /**
     *  Save the Security Details
     */
    onSubmit(securityData) {
        this.spinner.show();
        this.securityData = securityData;
        let registerData = {
            'first_name': this.regitserData.firstName.trim(),
            'last_name': this.regitserData.lastName.trim(),
            'franchisee_name': this.regitserData.franchiseeName.trim(),
            'email': this.regitserData.email,
            'phone': this.regitserData.phoneNumber,
            'address': this.regitserData.address,
            'city': this.regitserData.city,
            'state': this.regitserData.state,
            'zip': this.regitserData.zip,

            'bill_first_name': this.billingData.billFirstName.trim(),
            'bill_last_name': this.billingData.billLastName.trim(),
            'bill_email': this.billingData.billEmail,
            'bill_phone': this.billingData.billPhoneNumber,
            'bill_address': this.billingData.billAddress,
            'bill_city': this.billingData.billCity,
            'bill_state': this.billingData.billState,
            'bill_zip': this.billingData.billZip,

            'password': securityData.passwords.password,
        };

        this.userService.userSignup(registerData).subscribe(
            result => this.signupSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    signupSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            localStorage.setItem('token', result.data.auth_token);
            localStorage.setItem('role', result.data.role);
            localStorage.setItem('userId', result.data.user_data.id);
            localStorage.setItem('franchiseId', result.data.franchise_data.user_id);
            localStorage.setItem('userName', result.data.user_data.first_name + ' ' + result.data.user_data.last_name);
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
            this.toastr.error(AppConstant.SERVER_ERROR);
        }
        this.spinner.hide();
    }
}

