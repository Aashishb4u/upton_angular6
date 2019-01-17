import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './reset-password.component';
import {SharedModule} from '../shared';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';

@NgModule({
    imports: [
        SharedModule,
        ResetPasswordRoutingModule,
        FormsModule
    ],
    declarations: [
        ResetPasswordComponent
    ],
    providers: []
})
export class ResetPasswordModule {
}
