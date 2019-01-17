import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../core';
import {BlankSpaceValidator} from "../shared/theme/validators/BlankSpace.Validator";
import {EmailValidator} from "../shared/theme/validators/email.validator";
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppConstant} from "../app.constant";

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.scss'],
})

export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm:FormGroup;

    constructor(private router:Router,
                private userService:UserService,
                private fb:FormBuilder,
                private toastr:ToastrService,
                private spinner:NgxSpinnerService) {

        // use FormBuilder to create a form group (forgotPasswordForm)
        this.forgotPasswordForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate, BlankSpaceValidator.validate])],
        });
    }

    ngOnInit() {
        this.spinner.hide();
    }

    /**
     *  Disabled the Send Button
     */
    disableSubmit() {
        if (this.forgotPasswordForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the Password Details
     */
    onSubmit(passwordData) {
        this.spinner.show();
        let data = {
            'email': passwordData.email,
        };
        this.userService.forgotPassword(data).subscribe(
            result => this.forgotPasswordSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    forgotPasswordSuccess(result) {
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

