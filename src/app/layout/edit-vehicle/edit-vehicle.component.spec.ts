import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EditVehicleComponent} from './edit-vehicle.component'
import {EditVehicleModule} from './edit-vehicle.module'

describe('EditVehicleComponent', () => {
    let component:EditVehicleComponent
    let fixture:ComponentFixture<EditVehicleComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    EditVehicleModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(EditVehicleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

