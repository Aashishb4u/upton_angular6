import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ManageDriverComponent} from './manage-driver.component'
import {ManageDriverModule} from './manage-driver.module'

describe('ManageUserComponent', () => {
    let component:ManageDriverComponent
    let fixture:ComponentFixture<ManageDriverComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ManageDriverModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageDriverComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

