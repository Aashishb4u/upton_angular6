import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {OrderMvrComponent} from './order-mvr.component'
import {OrderMvrModule} from './order-mvr.module'

describe('OrderMvrComponent', () => {
    let component:OrderMvrComponent
    let fixture:ComponentFixture<OrderMvrComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    OrderMvrModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderMvrComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

