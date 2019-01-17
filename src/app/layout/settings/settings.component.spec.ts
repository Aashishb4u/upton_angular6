import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {SettingsComponent} from './settings.component'
import {SettingsModule} from './settings.module'

describe('SettingsComponent', () => {
    let component:SettingsComponent
    let fixture:ComponentFixture<SettingsComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [
                    SettingsModule,
                    RouterTestingModule,
                    BrowserAnimationsModule,
                ],
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})

