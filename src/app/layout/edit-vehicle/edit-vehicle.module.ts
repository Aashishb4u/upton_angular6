import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditVehicleRoutingModule} from './edit-vehicle-routing.module';
import {EditVehicleComponent} from './edit-vehicle.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {ModalModule} from "ngx-modal";

@NgModule({
    imports: [
        CommonModule,
        EditVehicleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        ModalModule,
        NgxMyDatePickerModule.forRoot()
    ],
    declarations: [
        EditVehicleComponent,
    ]
})
export class EditVehicleModule {
}
