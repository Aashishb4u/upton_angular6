import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AddVehicleComponent} from './add-vehicle.component'
import {AddVehicleModule} from './add-vehicle.module'

describe('AddVehicleComponent', () => {
    let component:AddVehicleComponent
    let fixture:ComponentFixture<AddVehicleComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AddVehicleModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AddVehicleComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

