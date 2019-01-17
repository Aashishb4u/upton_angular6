import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditStoreRoutingModule} from './edit-store-routing.module';
import {EditStoreComponent} from './edit-store.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
    imports: [
        CommonModule,
        EditStoreRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        EditStoreComponent,
    ]
})
export class EditStoreModule {
}
