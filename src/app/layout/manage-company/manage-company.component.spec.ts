import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ManageCompanyComponent} from './manage-company.component'
import {ManageCompanyModule} from './manage-company.module'

describe('ManageCompanyComponent', () => {
    let component:ManageCompanyComponent
    let fixture:ComponentFixture<ManageCompanyComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ManageCompanyModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageCompanyComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

