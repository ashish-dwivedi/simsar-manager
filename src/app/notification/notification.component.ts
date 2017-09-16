import { Component } from '@angular/core';
import { NotificationService } from "./notification.service";
import { INotification } from "./notification";


@Component({
    templateUrl: './notification.component.html',
    styles: ['.notification {width: 65%;margin: 0 auto;}',
        '.panel-body .row {margin-top: 15px}',
        '.success-message {text-align:center; color: #00FF7F}',
        '.material-icons.message-icon {font-size: 45px; vertical-align: text-bottom; margin-right: 15px;}']
})
export class NotificationComponent {
    notification:any = {};
    intimation: any = {temp : {}, perm: {}};
    notificationList: INotification[] = [];
    categories: string[] = ['Grocery', 'Bill', 'CSD'];

    constructor(private _NotificationService: NotificationService) {}

    ngOnInit() {
        this._NotificationService.getNotificationsList().subscribe(
            data => this.notificationList = data,
            error => console.log(error),
            () => this.processNotification()
        );
    }

    processNotification() {
        let today = new Date(),
            message = [];
        for(let i=0; i<this.notificationList.length; i++) {
            this.notificationList[i].lastPaid = new Date(this.notificationList[i].lastPaid);
            let newEffectiveDate = this.notificationList[i].lastPaid;
            newEffectiveDate.setDate(newEffectiveDate.getDate() + this.notificationList[i].frequency);
            if(newEffectiveDate <= today) {
                message.push(this.notificationList[i].title);
            }
            this.intimation.perm = {
                message : message.toString() + (message.length===1 ? ' is': ' are') + ' pending!',
                icon : 'notifications_active',
                color: 'red'
            };
        }
    }

    submitSubscription() {
        this.notification['id'] = Math.random();
        this._NotificationService.submitSubscription(this.notification).subscribe(
            data=> {
                this.intimation.temp = {
                    message : "Neat!! We got you covered.",
                    icon : 'thumbs_up',
                    color: 'red'
                };
                setTimeout(()=> {this.intimation.temp = {};}, 3000)
            },
            error=> console.log(error)
        )
    }
}