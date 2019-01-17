import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageCompanyRoutingModule} from './manage-company-routing.module';
import {ManageCompanyComponent} from './manage-company.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ManageCompanyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        ManageCompanyComponent,
    ]
})
export class ManageCompanyModule {
}
