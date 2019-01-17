import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared';
import { RegisterRoutingModule } from './register-routing.module';
import {TextMaskModule} from "angular2-text-mask/dist/angular2TextMask";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: []
})
export class RegisterModule {}
