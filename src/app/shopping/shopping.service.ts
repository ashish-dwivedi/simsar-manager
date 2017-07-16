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

    removeList(id): Observable<string> {
        let url = 'http://localhost:3000/shopping';
        url += '/' + id
        return this._Http.delete(url).map(
            (response: Response) => response.json()
        )
        .do(
            data => { console.log('Shopping data fetched successfully!') },
            error => { console.log(JSON.stringify(error)) }
        )
    }

    updateList(listToUpdate): Observable<string> {
        let url = 'http://localhost:3000/shopping/' + listToUpdate.id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._Http.put(url, listToUpdate, {headers: headers}).map(
            (response: Response) => response.json()
        )
        .do(
            data => console.log('Hooray! List updated'),
            error => console.log(JSON.stringify(error))
        )
    }

    persistNewList(listToPersist): Observable<string> {
        let url = 'http://localhost:3000/shopping';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._Http.post(url, listToPersist, {headers: headers}).map(
            (response: Response) => response.json()
        )
    }
}