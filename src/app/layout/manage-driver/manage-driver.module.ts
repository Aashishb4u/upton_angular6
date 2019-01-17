import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageDriverRoutingModule} from './manage-driver-routing.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageDriverComponent} from './manage-driver.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";

@NgModule({
    imports: [
        CommonModule,
        ManageDriverRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        ManageDriverComponent,
    ]
})
export class ManageDriverModule {
}
