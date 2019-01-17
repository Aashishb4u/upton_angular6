import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {STATE_CONSTANTS} from "../../shared/constants/state";
import {YEAR_CONSTANTS} from "../../shared/constants/year";
import {FormBuilder, FormGroup} from '@angular/forms';
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {EventService} from "../../core/services/event.service";
import {Modal} from "ngx-modal/index";
import {Validators} from "@angular/forms";
import {BlankSpaceValidator} from "../../shared/theme/validators/BlankSpace.Validator";

@Component({
    selector: 'app-edit-vehicle',
    templateUrl: './edit-vehicle.component.html',
    styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
    userId:any;
    vehicleForm:FormGroup;
    stateGroupList:any[] = [];
    yearGroupList:any[] = [];
    id:any;
    driverId:any;
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
    @ViewChild('myModal') myModal:Modal;

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private routes:ActivatedRoute,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.userId = localStorage.getItem('userId');
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
        this.yearGroupList.push(YEAR_CONSTANTS.YEARS);
        this.id = this.routes.snapshot.queryParams['vehicleId'];
        this.driverId = this.routes.snapshot.queryParams['driverId'];
        this.getVehicleDetails();
        
        /**
         *  Add Vehicle Form
         */
        this.vehicleForm = this.fb.group({
            'year': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'make': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'model': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'tagNumber': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'tagExpirationDate': [null, Validators.compose([Validators.required])],
            'ownerFirstName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'ownerLastName': ['', Validators.compose([Validators.required, BlankSpaceValidator.validate])],
            'relation': [''],
            'insuranceCarrierName': [''],
            'policyNumber': [''],
            'effectiveDate': [null],
            'expirationDate': [null],
            'viewInspectionDate': [null],
            'nextInspectionDate': ['1 month'],
        });
    }

    ngOnInit() {
        window.scroll(0, 0);
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Edit Vehicle');
        },50);
    }

    /**
     *  Format Date
     */
    formatDate(event) {
        if (event.formatted) {
            return event.formatted;
        } else {
            return event.date.year + '/' + event.date.month + '/' + event.date.day;
        }
    }

    /**
     *  Disable the Add Driver Form
     */
    disableSubmit() {
        if (this.vehicleForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    getVehicleDetails() {
        this.userService.getVehicleDetails(this.id).subscribe(
            result => this.getVehicleDetailsSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    getVehicleDetailsSuccess(result) {
        if (result.success > 0) {
            this.vehicleForm.controls['year'].setValue(result.data.vehicle.year);
            this.vehicleForm.controls['make'].setValue(result.data.vehicle.make);
            this.vehicleForm.controls['model'].setValue(result.data.vehicle.model);
            this.vehicleForm.controls['tagNumber'].setValue(result.data.vehicle.tag_number);
            this.vehicleForm.controls['tagExpirationDate'].setValue(this.setDate(result.data.vehicle.tag_expiration_date));
            this.vehicleForm.controls['ownerFirstName'].setValue(result.data.vehicle.owner_first_name);
            this.vehicleForm.controls['ownerLastName'].setValue(result.data.vehicle.owner_last_name);
            this.vehicleForm.controls['relation'].setValue(result.data.vehicle.relation);
            this.vehicleForm.controls['insuranceCarrierName'].setValue(result.data.vehicle.insurance_carrier_name);
            this.vehicleForm.controls['policyNumber'].setValue(result.data.vehicle.policy_number);
            this.vehicleForm.controls['effectiveDate'].setValue(this.setDate(result.data.vehicle.effective_date));
            this.vehicleForm.controls['expirationDate'].setValue(this.setDate(result.data.vehicle.expiration_date));
            this.vehicleForm.controls['viewInspectionDate'].setValue(this.setDate(result.data.vehicle.vehicle_inspection_date));
            this.vehicleForm.controls['nextInspectionDate'].setValue(result.data.vehicle.next_inspection_date);
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
     *  Save the Vehicle Form Details
     */
    onSubmit(vehicleData) {
        this.spinner.show();
        let submitData = {
            'year': vehicleData.year,
            'driver_id': this.id,
            'make': vehicleData.make,
            'model': vehicleData.model,
            'tag_number': vehicleData.tagNumber,
            'tag_expiration_date': (!!vehicleData.tagExpirationDate) ? this.formatDate(vehicleData.tagExpirationDate) : '',
            'owner_first_name': vehicleData.ownerFirstName,
            'owner_last_name': vehicleData.ownerLastName,
            'relation': vehicleData.relation,
            'insurance_carrier_name': vehicleData.insuranceCarrierName,
            'policy_number': vehicleData.policyNumber,
            'effective_date': (!!vehicleData.effectiveDate) ? this.formatDate(vehicleData.effectiveDate) : '',
            'expiration_date': (!!vehicleData.expirationDate) ? this.formatDate(vehicleData.expirationDate) : '',
            'vehicle_inspection_date': (!!vehicleData.viewInspectionDate) ? this.formatDate(vehicleData.viewInspectionDate) : '',
            'next_inspection_date': vehicleData.nextInspectionDate,
        };

        this.userService.updateVehicle(submitData, this.id).subscribe(
            result => this.updateVehicleSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    updateVehicleSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['manage-vehicle'], {queryParams: {driverId: this.driverId}});
        }
        this.spinner.hide();
    }


    /**
     * Function to load image.
     */
    fileChangeListener($event) {
        let image:any = new Image();
        let file:File = $event.target.files[0];
        if ($event.target.files.length != 0) {
            if (file.type.substring(0, 5) == 'image') {
                let myReader:FileReader = new FileReader();
                myReader.onloadend = (loadEvent:any) => {
                    image.src = loadEvent.target.result;
                    if (file.size <= 2000000) {
                        let a = image.src.split(',')[1];
                        // this.hideRemoveImage = true;
                        if (image.src) {
                            // this.patientForm.controls['profile_img'].patchValue(image.src);
                            // this.preViewImage = image.src;
                        } else {
                            image.src = '';
                            // image.src = this.defaultImage;
                        }
                        // this.previewImage(image.src);
                    } else {
                        $event.target.value = '';
                        this.toastr.error('File should be less than 2 MB');
                    }
                };
                myReader.readAsDataURL(file);
            } else {
                $event.target.value = '';
                this.toastr.error('Invalid File type');
            }
        }
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
