import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AddCompanyComponent} from './add-company.component'
import {AddCompanyModule} from './add-company.module'

describe('AddCompanyComponent', () => {
    let component:AddCompanyComponent
    let fixture:ComponentFixture<AddCompanyComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AddCompanyModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCompanyComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

