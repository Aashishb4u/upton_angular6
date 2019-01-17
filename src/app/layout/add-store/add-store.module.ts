import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddStoreRoutingModule} from './add-store-routing.module';
import {AddStoreComponent} from './add-store.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
    imports: [
        CommonModule,
        AddStoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        AddStoreComponent,
    ]
})
export class AddStoreModule {
}
