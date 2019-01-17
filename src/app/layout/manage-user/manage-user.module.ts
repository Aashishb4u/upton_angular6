import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageUserRoutingModule} from './manage-user-routing.module';
import {ManageUserComponent} from './manage-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {NgxPaginationModule} from "ngx-pagination";
import {ModalModule} from "ngx-modal";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ManageUserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        NgxPaginationModule,
        ModalModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        ManageUserComponent,
    ]
})
export class ManageUserModule {
}
