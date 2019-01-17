import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ForgotPasswordComponent} from './forgot-password.component';
import {SharedModule} from '../shared';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';

@NgModule({
    imports: [
        SharedModule,
        ForgotPasswordRoutingModule,
        FormsModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    providers: []
})
export class ForgotPasswordModule {
}
