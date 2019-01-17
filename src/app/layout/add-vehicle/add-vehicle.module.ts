import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddVehicleRoutingModule} from './add-vehicle-routing.module';
import {AddVehicleComponent} from './add-vehicle.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";
import {ModalModule} from "ngx-modal";

@NgModule({
    imports: [
        CommonModule,
        AddVehicleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        ModalModule,
        NgxMyDatePickerModule.forRoot()
    ],
    declarations: [
        AddVehicleComponent,
    ]
})
export class AddVehicleModule {
}
