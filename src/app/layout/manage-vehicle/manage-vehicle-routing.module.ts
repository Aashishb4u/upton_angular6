import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageVehicleComponent} from './manage-vehicle.component';

const routes:Routes = [
    {
        path: '', component: ManageVehicleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageVehicleRoutingModule {
}
