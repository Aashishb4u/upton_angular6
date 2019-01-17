import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileRoutingModule} from './edit-profile-routing.module';
import {EditProfileComponent} from './edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
    imports: [
        CommonModule,
        EditProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        EditProfileComponent,
    ]
})
export class EditProfileModule {
}
