import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageStoreRoutingModule} from './manage-store-routing.module';
import {ManageStoreComponent} from './manage-store.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ManageStoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        ManageStoreComponent,
    ]
})
export class ManageStoreModule {
}
