import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AddUserComponent} from './add-user.component'
import {AddUserModule} from './add-user.module'

describe('AddUserComponent', () => {
    let component:AddUserComponent
    let fixture:ComponentFixture<AddUserComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AddUserModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUserComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

