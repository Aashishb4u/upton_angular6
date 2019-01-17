import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AddDriverComponent} from './add-driver.component'
import {AddDriverModule} from './add-driver.module'

describe('AddDriverComponent', () => {
    let component:AddDriverComponent
    let fixture:ComponentFixture<AddDriverComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AddDriverModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDriverComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

