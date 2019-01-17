import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageFileComponent} from './manage-file.component';

const routes:Routes = [
    {
        path: '', component: ManageFileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageFileRoutingModule {
}
