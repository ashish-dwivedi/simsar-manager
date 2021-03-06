import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IExpense } from './expense';

@Injectable()
export class ExpenseService {
    private expenseUrl: string = 'http://localhost:3000/expenses';

    constructor(private _Http: Http) {}

    getExpenses(params?): Observable<IExpense[]> {
        let url:string = this.expenseUrl;
        if(params) {
                url = url + params;
        }
        return this._Http.get(url)
        .map(
            (response: Response) =>  <IExpense[]> response.json()
        )
        .do(
            data => { console.log('Data fetched successfully!') },
            error => { console.log(JSON.stringify(error)) }
        )
    }

    addUpdateExpense(entryToAdd: IExpense, mode: string): Observable<IExpense[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(mode === 'add') {
            return this._Http.post(this.expenseUrl, entryToAdd, {headers:headers})
            .map((response: Response)=> <IExpense[]>response.json());
        } else if(mode === 'edit') {
            this.expenseUrl += '/' + entryToAdd.id;
            return this._Http.put(this.expenseUrl, entryToAdd, {headers:headers})
            .map((response: Response)=> <IExpense[]>response.json());
        } else {
            this.expenseUrl += '/' + entryToAdd.id;
            return this._Http.delete(this.expenseUrl)
            .map((response: Response)=> <IExpense[]>response.json());
        }
    }

    deleteEntry(id): Observable<string> {
        let url = this.expenseUrl + '/' + id;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._Http.delete(url, {headers: headers}).map(
            (response: Response) => response.json()
        )
        .do(
            data => console.log(data)
        )
    }
}