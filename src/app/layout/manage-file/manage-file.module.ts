import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageFileRoutingModule} from './manage-file-routing.module';
import {ManageFileComponent} from './manage-file.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {ModalModule} from "ngx-modal";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
    imports: [
        CommonModule,
        ManageFileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        ModalModule,
        NgxPaginationModule
    ],
    declarations: [
        ManageFileComponent,
    ]
})
export class ManageFileModule {
}
