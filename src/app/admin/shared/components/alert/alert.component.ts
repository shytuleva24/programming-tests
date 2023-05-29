import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../services/alert.service";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

    @Input() delay = 5000;

    public textAlert: string;
    public typeAlert: string = 'success';
    alertSubscription: Subscription;

    constructor(
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.alertSubscription = this.alertService.alert$.subscribe(alert => {
            this.textAlert = alert.text;
            this.typeAlert = alert.type;

            setTimeout(() => {
                this.textAlert = '';
            }, this.delay);
        });

    }


    ngOnDestroy(): void {
        if (this.alertSubscription) this.alertSubscription.unsubscribe();
    }

}
