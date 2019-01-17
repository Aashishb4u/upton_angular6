import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LoginModule} from './login/login.module';
import {SharedModule} from './shared';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {RestangularModule, Restangular} from 'ngx-restangular';
import { environment } from '../environments/environment';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegisterModule} from "./register/register.module";
import {Utility} from "./shared/utility/utility";
import {ForgotPasswordModule} from "./forgot-password/forgot-password.module";
import {ResetPasswordModule} from "./reset-password/reset-password.module";
import {LayoutModule} from "./layout/layout.module";
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from "@angular/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {Helper} from "./core/helpers/helper";
import {LoginGuard, PreLogin} from "./core/filter/app.guard";
import {AppConstant} from "./app.constant";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        HttpClientModule,
        HttpModule,
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        AppRoutingModule,
        LayoutModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(), // ToastrModule added
    ],
    providers: [Utility, Helper, LoginGuard, PreLogin, AppConstant],
    bootstrap: [AppComponent]
})
export class AppModule {
}
