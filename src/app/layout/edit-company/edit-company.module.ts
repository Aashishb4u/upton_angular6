import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditCompanyRoutingModule} from './edit-company-routing.module';
import {EditCompanyComponent} from './edit-company.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
    imports: [
        CommonModule,
        EditCompanyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        EditCompanyComponent,
    ]
})
export class EditCompanyModule {
}
