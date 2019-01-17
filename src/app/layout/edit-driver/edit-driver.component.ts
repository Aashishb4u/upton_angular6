import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import * as moment from 'moment';
import {EmailValidator} from "../../shared/theme/validators/email.validator";
import {EventService} from "../../core/services/event.service";

@Component({
    selector: 'app-edit-driver',
    templateUrl: './edit-driver.component.html',
    styleUrls: ['./edit-driver.component.scss'],
})
export class EditDriverComponent implements OnInit {
    userId:any;
    id:any;
    stateGroupList:any[] = [];
    editDriverForm:FormGroup;
    storeList:any = [];
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    myOptions:INgxMyDpOptions = {
        // other options...
        dateFormat: 'yyyy/mm/dd',
        openSelectorTopOfInput: true,
        disableSince: {
            year: new Date().getFullYear(),
            month: new Date().getUTCMonth() + 1,
            day: new Date().getDate() + 1
        }
    };

    myOptions1:INgxMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        openSelectorTopOfInput: true,
    };

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private routes:ActivatedRoute,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.userId = localStorage.getItem('userId');
        this.id = this.routes.snapshot.queryParams['id'];

        this.stateGroupList.push(STATE_CONSTANTS.STATES);

        /**
         *  Add Driver Form
         */
        this.editDriverForm = this.fb.group({
            'storeNumber': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],

            'driverFirstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'driverLastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'driverDOB': [null, Validators.compose([Validators.required])],
            'licenseNumber': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'licenseState': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'licenseIssueDate': [null],
            'licenseExpirationDate': [''],
            'email': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate, EmailValidator.validate])],
            'phoneNumber': [''],
            'altPhoneNumber': [''],
            'lastMvrDate': [null],
            'recheckMvr': [''],
            'comments': [''],
        });
        this.getStoreList();


    }

    ngOnInit() {
        window.scroll(0, 0);
        this.getSpecificDriver();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit Driver');
        },50);
    }

    /**
     *  Get Store List
     */
    getStoreList() {
        this.spinner.show();
        this.userService.getStoreList(this.userId).subscribe(
            result => this.getStoreListSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getStoreListSuccess(result) {
        if (result.success > 0) {
            this.storeList = [];
            if (result.data.store && (result.data.store.length > 0)) {
                result.data.store.forEach(item => {
                    this.storeList.push(item);
                });
            } else {
                this.storeList = [];
            }
        }
        this.spinner.hide();
    }

    /**
     *  Set Date
     */
    setDate(event) {
        let currentDate = new Date(event);
        return {
            date: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate()
            }
        }
    }

    /**
     *  Get Specific Company
     */
    getSpecificDriver() {
        this.spinner.show();
        this.userService.getSpecificDriver(this.id).subscribe(
            result => this.getSpecificDriverSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getSpecificDriverSuccess(result) {
        if (result.success > 0) {
            this.editDriverForm.controls['storeNumber'].setValue(result.data.driver.store_id);

            this.editDriverForm.controls['driverFirstName'].setValue(result.data.driver.first_name);
            this.editDriverForm.controls['driverLastName'].setValue(result.data.driver.last_name);
            this.editDriverForm.controls['driverDOB'].setValue(this.setDate(result.data.driver.driver_dob));
            this.editDriverForm.controls['licenseNumber'].setValue(result.data.driver.license_number);
            this.editDriverForm.controls['licenseState'].setValue(result.data.driver.license_state);
            this.editDriverForm.controls['licenseIssueDate'].setValue(this.setDate(result.data.driver.license_issue_date));
            this.editDriverForm.controls['licenseExpirationDate'].setValue(this.setDate(result.data.driver.license_expiration_date));
            this.editDriverForm.controls['email'].setValue(result.data.driver.email);
            this.editDriverForm.controls['phoneNumber'].setValue(result.data.driver.phone);
            this.editDriverForm.controls['altPhoneNumber'].setValue(result.data.driver.alternate_phone);
            this.editDriverForm.controls['lastMvrDate'].setValue(this.setDate(result.data.driver.last_mvr_date));
            this.editDriverForm.controls['recheckMvr'].setValue(result.data.driver.re_check_mvr);
            this.editDriverForm.controls['comments'].setValue(result.data.driver.comments);
        }
        this.spinner.hide();
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.editDriverForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  Format Date Method
     */
    formatDate(event) {
        if (event.formatted) {
            return event.formatted;
        } else {
            return event.date.year + '/' + event.date.month + '/' + event.date.day;
        }
    }

    /**
     *  Save the UserForm Details
     */
    onSubmit(driverData) {
        this.spinner.show();
        let submitData = {
            'store_id': driverData.storeNumber,
            'first_name': driverData.driverFirstName,
            'last_name': driverData.driverLastName,
            'driver_dob': (!!driverData.driverDOB) ? this.formatDate(driverData.driverDOB) : '',
            'license_number': driverData.licenseNumber,
            'license_state': driverData.licenseState,
            'license_issue_date': (!!driverData.licenseIssueDate) ? this.formatDate(driverData.licenseIssueDate) : '',
            'license_expiration_date': (!!driverData.licenseExpirationDate) ? this.formatDate(driverData.licenseExpirationDate) : '',
            'email': driverData.email,
            'phone': driverData.phoneNumber,
            'alternate_phone': driverData.altPhoneNumber,
            'last_mvr_date': (!!driverData.lastMvrDate) ? this.formatDate(driverData.lastMvrDate) : '',
            're_check_mvr': driverData.recheckMvr,
            'comments': driverData.comments,
        };

        this.userService.updateDriver(submitData, this.id).subscribe(
            result => this.updateDriverSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    updateDriverSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['manage-driver']);
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
