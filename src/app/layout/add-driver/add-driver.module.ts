import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddDriverRoutingModule} from './add-driver-routing.module';
import {AddDriverComponent} from './add-driver.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";

@NgModule({
    imports: [
        CommonModule,
        AddDriverRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxMyDatePickerModule.forRoot()
    ],
    declarations: [
        AddDriverComponent,
    ]
})
export class AddDriverModule {
}
