import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EditProfileComponent} from './edit-profile.component'
import {EditProfileModule} from './edit-profile.module'

describe('EditProfileComponent', () => {
    let component:EditProfileComponent
    let fixture:ComponentFixture<EditProfileComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    EditProfileModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(EditProfileComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

