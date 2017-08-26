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
    dropDownOpen: boolean  = false;
    totalExpense: number = 0;
    sortParams: any = {sortOrder: 'asc', sortBy: ''};
    sortFields: string[] = ['category', 'date', 'amount'];

    constructor(private _ExpenseService: ExpenseService, private _Router: Router, private _NgbModal: NgbModal) {}

    addUpdateExpense(mode: string, entryToUpdate?: IExpense): void {
        let modalRef = this._NgbModal.open(AddExpenseComponent);
        let data = mode==='add' ? {id:Math.random()} : this.selectedEntries[0];
        modalRef.componentInstance.modalData = {mode: mode, data: data};
    }

    deleteExpense() {
        for(let i= 0; i<this.selectedEntries.length; i++) {
            this._ExpenseService.deleteEntry(this.selectedEntries[i].id).subscribe(
                data => location.reload()
            );
        }
    }

    selectForUpdation(expense: IExpense, mode: string) {
        let returnValue: boolean = false;
        if(this.selectionStatus(expense).found) {
            this.selectedEntries.splice(this.selectionStatus(expense).index, 1);
        } else {
            this.selectedEntries.push(expense);
        }
        this.calculateExpenses(this.selectedEntries.length>0?true:false);
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

    sortEntries(field, isSort?) {
        this.sortParams.sortBy = field;
        let params = '?_sort=' + field + '&_order=' + this.sortParams.sortOrder;
        this._ExpenseService.getExpenses(params).subscribe(
            expenses => this.expenseList = expenses,
            error => this.errorText = error
        )
        if(!isSort) {
            this.dropDownOpen = !this.dropDownOpen;
        }
        return false;
    }

    toggleSortOrder() {
        this.sortParams.sortOrder = this.sortParams.sortOrder === 'asc' ? 'desc' : 'asc';
        this.sortEntries(this.sortParams.sortBy, true);
    }

    calculateExpenses(isSelected ? : boolean ) {
        let i,
        expenseArr: any[] = isSelected ? this.selectedEntries : this.expenseList;

        this.totalExpense = 0;
        for(i = 0; i<expenseArr.length; i++) {
            this.totalExpense += expenseArr[i].amount;
        }
    }

    ngOnInit() : void {
        this._ExpenseService.getExpenses().subscribe(
            expenses => {this.expenseList = expenses; this.calculateExpenses(false)},
            error => this.errorText = error
        )
    }
}