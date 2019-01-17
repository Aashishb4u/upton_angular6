import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddUserRoutingModule} from './add-user-routing.module';
import {AddUserComponent} from './add-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {AngularMultiSelectModule} from "angular4-multiselect-dropdown/dist/multiselect.component";

@NgModule({
    imports: [
        CommonModule,
        AddUserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        AngularMultiSelectModule,
    ],
    declarations: [
        AddUserComponent,
    ]
})
export class AddUserModule {
}
