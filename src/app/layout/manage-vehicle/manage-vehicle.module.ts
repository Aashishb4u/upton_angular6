import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageVehicleRoutingModule} from './manage-vehicle-routing.module';
import {ManageVehicleComponent} from './manage-vehicle.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ManageVehicleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        ManageVehicleComponent,
    ]
})
export class ManageVehicleModule {
}
