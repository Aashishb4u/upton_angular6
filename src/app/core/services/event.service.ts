import {Injectable, EventEmitter, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class EventService {
    user: any;

    @Output() changeContentToptext: EventEmitter<any> = new EventEmitter(true);
    @Output() profileData:EventEmitter<any> = new EventEmitter(true);

    constructor() {
    }

    setProfileData(value) {
        this.profileData.emit(value);
    }

    getProfileData():EventEmitter<any> {
        return this.profileData;
    }

    getChangedContentToptext(): EventEmitter<any>{
        return this.changeContentToptext;
    }

    setChangedContentToptext(value){
        this.changeContentToptext.emit(value);
    }
}