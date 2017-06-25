import { Component, OnInit } from '@angular/core';
import { IExpense } from './expense';
import { ExpenseService } from './expense.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddExpenseComponent } from './expense.add.component';

@Component({
    templateUrl: './expenses.component.html',
    styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
    expenseList: IExpense[];
    errorText: string = '';

    constructor(private _ExpenseService: ExpenseService, private _Router: Router, private _NgbModal: NgbModal) {}

    addUpdateExpense(mode: string, entryToUpdate?: IExpense): void {
        let modalRef = this._NgbModal.open(AddExpenseComponent);
        let data = mode==='add' ? {id:this.expenseList.length+1} : entryToUpdate;
        modalRef.componentInstance.modalData = {mode: mode, data: data};        
    }

    ngOnInit() : void {
        this._ExpenseService.getExpenses().subscribe(
            expenses => this.expenseList = expenses,
            error => this.errorText = error
        )
    }
}