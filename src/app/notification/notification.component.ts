import { Component } from '@angular/core';
import { NotificationService } from "./notification.service";
import { INotification } from "./notification";


@Component({
    templateUrl: './notification.component.html',
    styles: ['.notification {width: 65%;margin: 0 auto;}',
        '.panel-body .row {margin-top: 15px}',
        '.success-message {text-align:center; color: #00FF7F}',
        '.material-icons.thumbs_up {font-size: 45px; vertical-align: text-bottom; margin-right: 15px;}']
})
export class NotificationComponent {
    notification:any = {};
    message: string = '';
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
        let today = new Date();
        for(let i=0; i<this.notificationList.length; i++) {
            this.notificationList[i].lastPaid = new Date(this.notificationList[i].lastPaid);
            if(this.notificationList[i].lastPaid.getDate() + this.notificationList[i].frequency < today.getDate()) {
                alert('Hooray!! None are due');
            }
        }
    }

    submitSubscription() {
        this.notification['id'] = Math.random();
        this._NotificationService.submitSubscription(this.notification).subscribe(
            data=> {this.message = "Neat!! We got you covered."
                    setTimeout(()=> {this.message= "";}, 5000)
            },
            error=> console.log(error)
        )
    }
}