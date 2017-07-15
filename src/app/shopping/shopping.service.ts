import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IShopping } from './shopping';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ShoppingService {
    constructor(private _Http : Http) {}
    getShoppingList(): Observable<IShopping[]> {
        let url = 'http://localhost:3000/shopping';
        return this._Http.get(url).map(
            (response: Response) => <IShopping[]>response.json()
        ).do(
            data => { console.log('Shopping data fetched successfully!') },
            error => { console.log(JSON.stringify(error)) }
        )
    }
}