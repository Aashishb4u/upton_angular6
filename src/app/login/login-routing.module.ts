import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {PreLogin} from "../core/filter/app.guard";

const routes:Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [PreLogin]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
