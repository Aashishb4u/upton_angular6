import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ManageVehicleComponent} from './manage-vehicle.component'
import {ManageVehicleModule} from './manage-vehicle.module'

describe('ManageVehicleComponent', () => {
    let component:ManageVehicleComponent
    let fixture:ComponentFixture<ManageVehicleComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ManageVehicleModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageVehicleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

