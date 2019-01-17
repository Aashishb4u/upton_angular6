import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {EditStoreComponent} from './edit-store.component'
import {EditStoreModule} from './edit-store.module'

describe('EditStoreComponent', () => {
    let component:EditStoreComponent
    let fixture:ComponentFixture<EditStoreComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    EditStoreModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(EditStoreComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

