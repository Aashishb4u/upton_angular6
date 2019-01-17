import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderMvrComponent} from './order-mvr.component';

const routes:Routes = [
    {
        path: '', component: OrderMvrComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderMvrRoutingModule {
}
