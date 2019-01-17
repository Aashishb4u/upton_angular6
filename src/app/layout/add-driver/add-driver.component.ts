import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";
import {EmailValidator} from "../../shared/theme/validators/email.validator";
import {Utility} from "../../shared/utility/utility";
import {Router} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {EventService} from "../../core/services/event.service";

@Component({
    selector: 'app-add-driver',
    templateUrl: './add-driver.component.html',
    styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    addDriverForm:FormGroup;
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
        // other options...
        dateFormat: 'yyyy/mm/dd',
        openSelectorTopOfInput: true,
    };

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.userId = localStorage.getItem('userId');
        this.stateGroupList.push(STATE_CONSTANTS.STATES);

        /**
         *  Add Driver Form
         */
        this.addDriverForm = this.fb.group({
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
            'recheckMvr': ['6 months'],
            'comments': [''],
        });
        this.getStoreList();

    }

    ngOnInit() {
        window.scroll(0, 0);
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Add Driver');
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
     *  Disable the Add Driver Form
     */
    disableSubmit() {
        if (this.addDriverForm.valid) {
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
            return event;
        }
    }

    /**
     *  Save the driverForm Details
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

        this.userService.addDriver(submitData).subscribe(
            result => this.addDriverSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    addDriverSuccess(result) {
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
