import {NgModule, ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginGuard, PreLogin} from './core/filter/app.guard';

const routes: Routes = [
        {
            path: '',
            loadChildren: './layout/layout.module#LayoutModule',
             canActivate: [LoginGuard]
        },
        {
            path: 'login',
            loadChildren: './login/login.module#LoginModule',
            canActivate: [PreLogin]
        },
        {
            path: 'register',
            loadChildren: './register/register.module#RegisterModule',
            canActivate: [PreLogin]
        },
        {
            path: 'forgot-password',
            loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule',
            canActivate: [PreLogin]
        },
        {
            path: 'reset-password',
            loadChildren: './reset-password/reset-password.module#ResetPasswordModule',
            canActivate: [PreLogin]
        },

    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
