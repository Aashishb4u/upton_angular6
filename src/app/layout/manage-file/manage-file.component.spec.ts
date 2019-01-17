import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ManageFileComponent} from './manage-file.component'
import {ManageFileModule} from './manage-file.module'

describe('ManageFileComponent', () => {
    let component:ManageFileComponent
    let fixture:ComponentFixture<ManageFileComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ManageFileModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageFileComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

