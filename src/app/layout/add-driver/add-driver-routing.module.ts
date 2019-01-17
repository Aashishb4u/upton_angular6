import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDriverComponent} from './add-driver.component';

const routes:Routes = [
    {
        path: '', component: AddDriverComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddDriverRoutingModule {
}
