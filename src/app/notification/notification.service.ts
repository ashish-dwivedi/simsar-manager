import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { INotification } from "./notification";

import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
    notificationUrl: string = 'http://localhost:3000/notification';

    constructor(private _Http: Http) {}

    getNotificationsList(): Observable<INotification[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._Http.get(this.notificationUrl).map(
            (response: Response) => <INotification[]> response.json()
        )
    }

    submitSubscription(notificationToAdd: INotification): Observable<INotification> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._Http.post(this.notificationUrl, notificationToAdd, {headers}).map
        ((response: Response) => <INotification> response.json())
    }
}