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

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    addCompanyForm:FormGroup;
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        /**
         *  Manage Company Form
         */
        this.addCompanyForm = this.fb.group({
            'companyName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'email': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'phoneNumber': [''],
            'state': [''],
            'city': [''],
            'address': [''],
            'zip': [''],
        });
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Add Company');
        },50);
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.addCompanyForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the addCompanyForm Details
     */
    onSubmit(userData) {
        if (userData.phoneNumber === '000-000-0000' || userData.phoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (userData.zip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else {
            this.spinner.show();
            let submitData = {
                'company_name': userData.companyName.trim(),
                'email': userData.email,
                'phone': userData.phoneNumber,
                'address': userData.address,
                'city': userData.city,
                'state': userData.state,
                'zip': userData.zip,
            };

            this.userService.addCompany(submitData).subscribe(
                result => this.addCompanySuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    addCompanySuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['manage-company']);
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
