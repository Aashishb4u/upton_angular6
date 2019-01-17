import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {SharedModule} from '../shared';
import {LoginRoutingModule} from './login-routing.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        SharedModule,
        LoginRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: []
})
export class LoginModule {
}
