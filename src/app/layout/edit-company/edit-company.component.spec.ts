import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EditCompanyComponent} from './edit-company.component'
import {EditCompanyModule} from './edit-company.module'

describe('EditCompanyComponent', () => {
    let component:EditCompanyComponent
    let fixture:ComponentFixture<EditCompanyComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    EditCompanyModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(EditCompanyComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

