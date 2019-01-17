import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes:Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'prefix'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'users',
                loadChildren: './manage-user/manage-user.module#ManageUserModule'
            },
            {
                path: 'users/add-user',
                loadChildren: './add-user/add-user.module#AddUserModule'
            },
            {
                path: 'users/edit-user',
                loadChildren: './edit-user/edit-user.module#EditUserModule'
            },
            {
                path: 'manage-company',
                loadChildren: './manage-company/manage-company.module#ManageCompanyModule'
            },
            {
                path: 'manage-company/add-company',
                loadChildren: './add-company/add-company.module#AddCompanyModule'
            },
            {
                path: 'manage-company/edit-company',
                loadChildren: './edit-company/edit-company.module#EditCompanyModule'
            },
            {
                path: 'manage-store',
                loadChildren: './manage-store/manage-store.module#ManageStoreModule'
            },
            {
                path: 'manage-store/add-store',
                loadChildren: './add-store/add-store.module#AddStoreModule'
            },
            {
                path: 'manage-store/edit-store',
                loadChildren: './edit-store/edit-store.module#EditStoreModule'
            },
            {
                path: 'manage-driver',
                loadChildren: './manage-driver/manage-driver.module#ManageDriverModule'
            },
            {
                path: 'manage-driver/add-driver',
                loadChildren: './add-driver/add-driver.module#AddDriverModule'
            },
            {
                path: 'manage-driver/edit-driver',
                loadChildren: './edit-driver/edit-driver.module#EditDriverModule'
            },
            {
                path: 'manage-vehicle/add-vehicle',
                loadChildren: './add-vehicle/add-vehicle.module#AddVehicleModule'
            },
            {
                path: 'edit-profile',
                loadChildren: './edit-profile/edit-profile.module#EditProfileModule'
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            },
            {
                path: 'order-mvr',
                loadChildren: './order-mvr/order-mvr.module#OrderMvrModule'
            },
            {
                path: 'manage-vehicle',
                loadChildren: './manage-vehicle/manage-vehicle.module#ManageVehicleModule'
            },
            {
                path: 'manage-file',
                loadChildren: './manage-file/manage-file.module#ManageFileModule'
            },
            {
                path: 'manage-vehicle/edit-vehicle',
                loadChildren: './edit-vehicle/edit-vehicle.module#EditVehicleModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
