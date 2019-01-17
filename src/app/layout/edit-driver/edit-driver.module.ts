import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditDriverRoutingModule} from './edit-driver-routing.module';
import {EditDriverComponent} from './edit-driver.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxMyDatePickerModule} from "ngx-mydatepicker";

@NgModule({
    imports: [
        CommonModule,
        EditDriverRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxMyDatePickerModule.forRoot()
    ],
    declarations: [
        EditDriverComponent,
    ]
})
export class EditDriverModule {
}
