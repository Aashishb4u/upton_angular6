import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddCompanyRoutingModule} from './add-company-routing.module';
import {AddCompanyComponent} from './add-company.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
    imports: [
        CommonModule,
        AddCompanyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        AddCompanyComponent,
    ]
})
export class AddCompanyModule {
}
