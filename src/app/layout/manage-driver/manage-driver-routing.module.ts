import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageDriverComponent} from './manage-driver.component';

const routes:Routes = [
    {
        path: '', component: ManageDriverComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageDriverRoutingModule {
}
