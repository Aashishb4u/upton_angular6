import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserRoutingModule} from './edit-user-routing.module';
import {EditUserComponent} from './edit-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {AngularMultiSelectModule} from "angular4-multiselect-dropdown/dist/multiselect.component";

@NgModule({
    imports: [
        CommonModule,
        EditUserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        AngularMultiSelectModule
    ],
    declarations: [
        EditUserComponent,
    ]
})
export class EditUserModule {
}
