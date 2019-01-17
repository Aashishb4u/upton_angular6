import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {EventService} from "../../../core/services/event.service";

@Component({
    selector: 'content-top',
    templateUrl: './content-top.component.html',
    styleUrls: ['./content-top.component.scss']
})
export class ContentTopComponent implements OnInit {

    activePageTitle : string = '';

    constructor(public router: Router,
                private toastr:ToastrService,
                private eventService: EventService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.eventService.getChangedContentToptext().subscribe(item => {
            this.activePageTitle = item;
        });
    }
    
}
