import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditVehicleComponent} from './edit-vehicle.component';

const routes:Routes = [
    {
        path: '', component: EditVehicleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditVehicleRoutingModule {
}
