import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {EqualPasswordsValidator} from "../../shared/theme/validators/equalPasswords.validator";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    passwordForm:FormGroup;
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
         *  Basic passwordForm Form
         */
        this.passwordForm = this.fb.group({
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'passwords': fb.group({
                'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
            }, {validator: EqualPasswordsValidator.validate('newPassword', 'confirmPassword')})
        });
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    ngOnInit() {
        this.spinner.hide();
        this.userId = localStorage.getItem('userId');
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Change Password');
        },50);
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.passwordForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the passwordForm Details
     */
    onSubmit(passwordData) {
        this.spinner.show();
        let submitData = {
            'old_password': passwordData.password,
            'new_password': passwordData.passwords.newPassword,
        };

        this.userService.changePassword(submitData, this.userId).subscribe(
            result => this.changePasswordSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    changePasswordSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
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
