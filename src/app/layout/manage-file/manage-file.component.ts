import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utility} from "../../shared/utility/utility";
import {Router, ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from 'ngx-spinner';
import {EventService} from "../../core/services/event.service";
import {AppConstant} from "../../app.constant";
import {Modal} from "ngx-modal/index";


@Component({
    selector: 'app-manage-file',
    templateUrl: './manage-file.component.html',
    styleUrls: ['./manage-file.component.scss'],
})
export class ManageFileComponent implements OnInit {
    userId:any;
    stateGroupList:any[] = [];
    fileForm:FormGroup;
    id:any;
    driverId:any;
    fileType:any = '';
    searchContent:string = '';
    file : any = '';
    public mask = [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public zipMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/];
    perPage:any = 10;
    pageNumber:any = 1;
    totalCount:any = 0;
    @ViewChild('myModal') myModal:Modal;
    @ViewChild('addFileModal') addFileModal:Modal;
    deletePostId:any;
    fileList:any = [];

    constructor(private userService:UserService,
                private toastr:ToastrService,
                private fb:FormBuilder,
                private utility:Utility,
                private router:Router,
                private routes:ActivatedRoute,
                private spinner:NgxSpinnerService,
                private eventService:EventService) {

        this.fileType = this.routes.snapshot.queryParams['fileType'];
        this.driverId = this.routes.snapshot.queryParams['driverId'];

        /**
         *  Basic fileForm Form
         */
        this.fileForm = this.fb.group({
            'description': ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
         this.spinner.hide();
         this.userId = localStorage.getItem('userId');
        this.uploadedFileList();
    }

    ngAfterViewInit(){
        setTimeout(()=>{
            this.eventService.setChangedContentToptext('Manage File');
        },50);
    }

    // Search the thread
    findThread(searchContent) {
        this.searchContent = searchContent;
        this.searchContent = this.searchContent.trim();
        this.pageNumber = 1;
        this.uploadedFileList();
    }

    // Clear the thread
    clearSearch() {
        this.searchContent = '';
        this.uploadedFileList();
    }

    uploadedFileList() {
        this.spinner.show();
        this.userService.uploadedFileList(this.driverId, this.searchContent, this.pageNumber).subscribe(
            result => this.uploadedFileListSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    uploadedFileListSuccess(result) {
        if (result.success > 0) {
            this.fileList = [];
            if (result.data.uploaded_file.data && (result.data.uploaded_file.data.length > 0)) {
                this.totalCount = result.data.uploaded_file.total;
                result.data.uploaded_file.data.forEach(item => {
                    this.fileList.push(item);
                })
            } else {
                this.fileList = [];
            }
        }
        this.spinner.hide();
    }

    /**
     *  Disable the User Form
     */
    disableSubmit() {
        if (this.fileForm.valid) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Function to load File.
     */
    fileChangeListener($event) {
        let file:File = $event.target.files[0];
        if ($event.target.files.length != 0) {
            if (file.type) {
                let myReader:FileReader = new FileReader();
                myReader.onloadend = (loadEvent:any) => {
                    let fileUpload: any;
                    fileUpload = loadEvent.target.result;
                    if (file.size <= 8000000) {
                        if (fileUpload) {
                            this.file = fileUpload;
                        } else {
                            fileUpload = '';
                        }
                        this.filePreview(fileUpload);
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

    filePreview(src) {
        this.file = src;
    }

    onSubmit(fileData) {
        this.spinner.show();
        if(this.file == '') {
            this.toastr.error(AppConstant.PLEASE_CHOOSE_FILE);
        }else {
            let fileDetails = {
                'file_type': this.fileType,
                'upload_file': this.file,
                'description': fileData.description,
            };

            this.userService.addFile(fileDetails, this.driverId).subscribe(
                result => this.addFileSuccess(result),
                errorResponse => this.HandleError(errorResponse)
            );
        }
    }

    addFileSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.addFileModal.close();
            this.uploadedFileList();
        }
        this.spinner.hide();
    }

    openFile() {
        this.addFileModal.open();
    }

    /**
     *  Delete Specific File Records
     */
    deleteFile(event) {
        this.deletePostId = '';
        this.deletePostId = event.id;
        this.myModal.open();
    }

    confirmDelete() {
        this.spinner.show();
        this.userService.deleteSpecificFile(this.deletePostId).subscribe(
            result => this.deleteSpecificFileSuccess(result),
            errorResponse => this.HandleError(errorResponse)
        );
    }

    deleteSpecificFileSuccess(result) {
        if (result.success > 0) {
            this.toastr.success(result.data.message);
            this.myModal.close();
            this.uploadedFileList();
        }
        this.spinner.hide();
    }

    /**
     *  Pagination event
     */
    getPageData(event) {
        this.pageNumber = event;
        this.spinner.show();
        this.uploadedFileList();
    }

    pageLimit(event) {
        this.perPage = event;
        this.spinner.show();
        this.uploadedFileList();
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
