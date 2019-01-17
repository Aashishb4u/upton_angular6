import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentTopComponent} from "./components/content-top/content-top.component";

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule.forRoot(),
    ],
    declarations: [LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        ContentTopComponent,
    ]
})
export class LayoutModule {
}
