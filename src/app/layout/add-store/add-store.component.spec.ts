import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AddStoreComponent} from './add-store.component'
import {AddStoreModule} from './add-store.module'

describe('AddStoreComponent', () => {
    let component:AddStoreComponent
    let fixture:ComponentFixture<AddStoreComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    AddStoreModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(AddStoreComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

