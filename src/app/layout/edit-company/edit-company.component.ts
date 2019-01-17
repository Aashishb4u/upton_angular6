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

@Component({
    selector: 'app-edit-company',
    templateUrl: './edit-company.component.html',
    styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    editCompanyForm:FormGroup;
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
         *  Edit Company Form
         */
        this.editCompanyForm = this.fb.group({
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
        this.getSpecificCompany();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit Company');
        },50);
    }

    /**
     *  Get Specific Company
     */
    getSpecificCompany() {
        this.spinner.show();
        this.userService.getSpecificCompany(this.id).subscribe(
            result => this.getSpecificCompanySuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificCompanySuccess(result) {
        if (result.success > 0) {
            this.editCompanyForm.controls['companyName'].setValue(result.data.company.company_name);
            this.editCompanyForm.controls['email'].setValue(result.data.company.email);
            this.editCompanyForm.controls['phoneNumber'].setValue(result.data.company.phone);
            this.editCompanyForm.controls['state'].setValue(result.data.company.state);
            this.editCompanyForm.controls['city'].setValue(result.data.company.city);
            this.editCompanyForm.controls['address'].setValue(result.data.company.address);
            this.editCompanyForm.controls['zip'].setValue(result.data.company.zip);
        }
        this.spinner.hide();
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.editCompanyForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Save the editCompanyForm Details
     */
    onSubmit(userData) {
        if (userData.phoneNumber === '000-000-0000' || userData.phoneNumber === '000000000000') {
            this.toastr.error(AppConstant.VALID_PHONE_NUMBER);
        } else if (userData.zip === '00000') {
            this.toastr.error(AppConstant.VALID_ZIP_NUMBER);
        } else if(userData.state === 'null'){
            userData.state = '';            
        } else {
            this.spinner.show();
            let submitData = {
                'company_name': userData.companyName,
                'email': userData.email,
                'phone': userData.phoneNumber,
                'address': userData.address,
                'city': userData.city,
                'state': userData.state,
                'zip': userData.zip,
            };

            this.userService.updateCompany(submitData, this.id).subscribe(
                result => this.updateCompanySuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    updateCompanySuccess(result) {
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
