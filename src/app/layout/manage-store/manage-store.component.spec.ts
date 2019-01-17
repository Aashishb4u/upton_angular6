import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ManageStoreComponent} from './manage-store.component'
import {ManageStoreModule} from './manage-store.module'

describe('ManageStoreComponent', () => {
    let component:ManageStoreComponent
    let fixture:ComponentFixture<ManageStoreComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    ManageStoreModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageStoreComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

