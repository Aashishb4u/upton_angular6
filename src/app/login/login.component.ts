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
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
})

export class LoginComponent implements OnInit {
    loginForm:FormGroup;

    constructor(private router:Router,
                private userService:UserService,
                private fb:FormBuilder,
                private toastr:ToastrService,
                private spinner:NgxSpinnerService) {

        // use FormBuilder to create a form group(loginForm)
        this.loginForm = this.fb.group({
            'email': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }

    ngOnInit() {
        this.spinner.hide();
    }

    /**
     *  Disable the Sign In
     */
    disableSubmit() {
        if (this.loginForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the Login Data
     */
    onSubmit(loginData) {
        this.spinner.show();
        let data = {
            'email': loginData.email,
            'password': loginData.password
        };

        this.userService.userLogin(data).subscribe(
            result => this.loginSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    loginSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            localStorage.setItem('token', result.data.auth_token);
            localStorage.setItem('userId', result.data.user_data.id);
            localStorage.setItem('franchiseId', result.data.franchise_id);
            localStorage.setItem('role', result.data.role.role);
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

