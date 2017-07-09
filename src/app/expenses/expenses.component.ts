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
    selectedEntries: IExpense[] = [];

    constructor(private _ExpenseService: ExpenseService, private _Router: Router, private _NgbModal: NgbModal) {}

    addUpdateExpense(mode: string, entryToUpdate?: IExpense): void {
        let modalRef = this._NgbModal.open(AddExpenseComponent);
        let data = mode==='add' ? {id:Math.random()} : this.selectedEntries[0];
        modalRef.componentInstance.modalData = {mode: mode, data: data};        
    }

    selectForUpdation(expense: IExpense, mode: string) {
        let returnValue: boolean = false;
        if(this.selectionStatus(expense).found) {
            this.selectedEntries.splice(this.selectionStatus(expense).index, 1);
        } else {
            this.selectedEntries.push(expense);
        }
    }

    selectionStatus(expense: IExpense) {
        let returnValue: any = {};
        for(let i=0; i<this.selectedEntries.length; i++) {
            if(this.selectedEntries[i].id === expense.id) {
                returnValue.found= true;
                returnValue.index= i; 
                break;
            }
        }
        return returnValue;
    }

    ngOnInit() : void {
        this._ExpenseService.getExpenses().subscribe(
            expenses => this.expenseList = expenses,
            error => this.errorText = error
        )
    }
}