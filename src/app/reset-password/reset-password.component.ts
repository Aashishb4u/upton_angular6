import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core';
import {ToastrService} from 'ngx-toastr';
import {EqualPasswordsValidator} from "../shared/theme/validators/equalPasswords.validator";
import {NgxSpinnerService} from 'ngx-spinner';
import {AppConstant} from "../app.constant";

@Component({
    selector: 'app-reset-password-page',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.scss'],

})
export class ResetPasswordComponent implements OnInit {
    hash:string = '';
    resetPasswordForm:FormGroup;

    constructor(private router:Router,
                private userService:UserService,
                private fb:FormBuilder,
                private toastr:ToastrService,
                private spinner:NgxSpinnerService) {

        // use FormBuilder to create a form group(resetPasswordForm)
        this.resetPasswordForm = this.fb.group({
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'confirmPassword')})
        });

        if (typeof(this.router['rawUrlTree']['queryParams']['hash']) !== 'undefined') {
            this.hash = this.router['rawUrlTree']['queryParams']['hash'];
        } else {
            this.toastr.error(AppConstant.INVALID_URL);
        }
    }

    ngOnInit() {
        this.spinner.hide();
    }

    /**
     *  Disable the reset-password Form
     */
    disableSubmit() {
        if (this.resetPasswordForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Submit the Form Details
     */
    onSubmit(passwordData) {
        this.spinner.show();
        let data = {
            'password': passwordData.passwords.password,
            'hash': this.hash
        };

        this.userService.resetPassword(data).subscribe(
            result => this.resetPasswordSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    resetPasswordSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['login']);
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

