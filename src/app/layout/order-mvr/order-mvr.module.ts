import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderMvrRoutingModule} from './order-mvr-routing.module';
import {OrderMvrComponent} from './order-mvr.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        OrderMvrRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        OrderMvrComponent,
    ]
})
export class OrderMvrModule {
}
