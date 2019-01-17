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
import {AppConstant} from "../../app.constant";

@Component({
    selector: 'app-add-vehicle',
    templateUrl: './add-vehicle.component.html',
    styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
    userId:any;
    vehicleForm:FormGroup;
    stateGroupList:any[] = [];
    yearGroupList:any[] = [];
    id:any;
    insuranceDescription : any = '';
    inspectionDescription : any = '';
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
    @ViewChild('addFileModal') addFileModal:Modal;
    @ViewChild('addInspectionFileModal') addInspectionFileModal:Modal;
    insuranceFile : any = '';
    inspectionFile : any = '';
    insuranceData : any = {
        'insurance_file': '',
        'insurance_type': 'insurance',
        'insurance_description': ''
    };
    inspectionData : any = {
        'inspection_file': '',
        'inspection_type': 'inspection',
        'inspection_description': ''
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
        this.stateGroupList.push(STATE_CONSTANTS.STATES);
        this.yearGroupList.push(YEAR_CONSTANTS.YEARS);
        this.id = this.routes.snapshot.queryParams['driverId'];
        
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
            this.eventService.setChangedContentToptext('Add Vehicle');
        },50);
    }

    /**
     *  Format Date
     */
    formatDate(event) {
        if (event.formatted) {
            return event.formatted;
        } else {
            return event;
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

    /**
     * Function to load File.
     */
    fileChangeListener($event, key) {
        let file:File = $event.target.files[0];
        if ($event.target.files.length != 0) {
            if (file.type) {
                let myReader:FileReader = new FileReader();
                myReader.onloadend = (loadEvent:any) => {
                    let fileUpload: any;
                    fileUpload = loadEvent.target.result;
                    if (file.size <= 8000000) {
                        if (fileUpload) {
                            this.filePreview(fileUpload, key);
                        } else {
                            fileUpload = '';
                            this.filePreview(fileUpload, key);
                        }                     
                    } else {
                        $event.target.value = '';
                        this.toastr.error(AppConstant.FILE_LIMIT);
                    }
                };
                myReader.readAsDataURL(file);
            } else {
                $event.target.value = '';
                this.toastr.error(AppConstant.INVALID_FILE_TYPE);
            }
        }
    }

    filePreview(src, key) {
        if(key == 'insurance') {
            this.insuranceFile = src;
        }else {
            this.inspectionFile = src;
        }
    }

    addInsuranceFile() {
        if(this.insuranceFile == '') {
            this.toastr.error(AppConstant.PLEASE_CHOOSE_FILE);
        }else if(this.insuranceDescription == '') {
            this.toastr.error(AppConstant.PLEASE_ADD_DESCRIPTION);
        }else {
            this.insuranceDescription = this.insuranceDescription.trim();
            this.insuranceData  = {
                'insurance_file': this.insuranceFile ? this.insuranceFile : '', 
                'insurance_type': 'insurance',
                'insurance_description': this.insuranceDescription ? this.insuranceDescription : ''
            };
            this.addFileModal.close();
        }
    }

    addInspectionFile() {
        if(this.inspectionFile == '') {
            this.toastr.error(AppConstant.PLEASE_CHOOSE_FILE);
        }else if(this.inspectionDescription == '') {
            this.toastr.error(AppConstant.PLEASE_ADD_DESCRIPTION);
        }else {
            this.inspectionDescription = this.inspectionDescription.trim();
            this.inspectionData  = {
                'inspection_file': this.inspectionFile ? this.inspectionFile : '', 
                'inspection_type': 'inspection',
                'inspection_description': this.insuranceDescription ? this.insuranceDescription : ''
            };
            this.addInspectionFileModal.close();
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
            'insurance_file': this.insuranceData['insurance_file'],
            'insurance_type': this.insuranceData['insurance_type'],
            'insurance_description': this.insuranceData['insurance_description'],
            'inspection_file': this.inspectionData['inspection_file'],
            'inspection_type': this.inspectionData['inspection_type'],
            'inspection_description': this.inspectionData['inspection_description'],
        };

        this.userService.addVehicle(submitData).subscribe(
            result => this.addVehicleSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    addVehicleSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.router.navigate(['manage-vehicle'], {queryParams: {driverId: this.id}});
        }
        this.spinner.hide();
    }


    // fileUpload(key) {
    //     if(key === 'insurance') {
    //         this.router.navigate(['manage-file'], {queryParams: {fileType: key, driverId: this.id}})
    //     }else {
    //         this.router.navigate(['manage-file'], {queryParams: {fileType: key, driverId: this.id}})
    //     }
    // }
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
