import { Component } from '@angular/core';
import { NotificationService } from "./notification.service";
import { INotification } from "./notification";


@Component({
    templateUrl: './notification.component.html',
    styles: ['.notification {width: 65%;margin: 0 auto;}',
        '.panel-body .row {margin-top: 15px}',
        '.success-message {text-align:center; color: #00FF7F}',
        '.material-icons.thumbs_up {font-size: 45px; vertical-align: text-bottom; margin-right: 15px;}'],
    providers: [NotificationService]
})
export class NotificationComponent {
    notification:any = {};
    message: string = '';
    categories: string[] = ['Grocery', 'Bill', 'CSD'];

    constructor(private _NotificationService: NotificationService) {}

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