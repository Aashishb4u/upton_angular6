import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditDriverComponent} from './edit-driver.component';

const routes:Routes = [
    {
        path: '', component: EditDriverComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditDriverRoutingModule {
}
