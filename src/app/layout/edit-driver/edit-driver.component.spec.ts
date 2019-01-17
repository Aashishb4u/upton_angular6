import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EditDriverComponent} from './edit-driver.component'
import {EditDriverModule} from './edit-driver.module'

describe('EditDriverComponent', () => {
    let component:EditDriverComponent
    let fixture:ComponentFixture<EditDriverComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    EditDriverModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(EditDriverComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

