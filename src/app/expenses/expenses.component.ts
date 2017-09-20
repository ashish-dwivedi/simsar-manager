import { Component, OnInit } from '@angular/core';
import { IExpense } from './expense';
import { ExpenseService } from './expense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmation } from '../delete-confirmation/delete.confirmation.component';

import { AddExpenseComponent } from './expense.add.component';

@Component({
    templateUrl: './expenses.component.html',
    styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
    expenseList = [];
    errorText: string = '';
    totalExpense: number = 0;
    expandButtons: boolean = false;
    dropDownOpen: boolean  = false;
    selectedEntries: IExpense[] = [];
    sortFields: string[] = ['date', 'category', 'amount'];
    sortParams: any = {sortOrder: 'desc', sortBy: 'date'};
    colors: string[] = ['rgba(66,214,146, 0.2)', 'rgba(66,133,244, 0.2)', 'rgba(246,145,178, 0.2)'];

    constructor(private _ExpenseService: ExpenseService, private _NgbModal: NgbModal) {}

    addUpdateExpense(mode: string, entryToUpdate?: IExpense): void {
        let _this = this,
            modalRef = _this._NgbModal.open(AddExpenseComponent),
            data = mode==='add' ? {id:Math.random()} : _this.selectedEntries[0];
        modalRef.componentInstance.modalData = {mode: mode, data: data};
        modalRef.result.then(
            function(result) {
                _this.getAllExpenses();
            }, function(error) {}
        );
    }

    getDeleteConfirmation() {
        let _this = this,
            modalRef = this._NgbModal.open(DeleteConfirmation);
        modalRef.componentInstance.modalData = {
            message: 'Are you sure you want to delete ' + this.selectedEntries.length +
            (this.selectedEntries.length===1 ? ' item?' : ' items?'),
        };
        modalRef.result.then(
            function(result) {
                _this.deleteExpense();
            }, function(error) {}
        );
    }

    deleteExpense() {
        for(let i= 0; i<this.selectedEntries.length; i++) {
            this._ExpenseService.deleteEntry(this.selectedEntries[i].id).subscribe(
                data => {this.selectedEntries=[];this.getAllExpenses();}
            );
        }
    }

    selectForUpdation(expense: IExpense, mode: string) {
        let returnValue: boolean = false;
        if(this.selectionStatus(expense).found) {
            this.selectedEntries.splice(this.selectionStatus(expense).index, 1);
        } else {
            this.expandButtons = true;
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
        this.getAllExpenses(params);
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
        expenseArr: any[] = isSelected ? this.selectedEntries : [].concat.apply([], this.expenseList);
        this.totalExpense = 0;
        for(i = 0; i<expenseArr.length; i++) {
            this.totalExpense += expenseArr[i].amount;
        }
    }

    seggregateExpenses(expenses) {
        let fieldsArray:number[] = [],
            newField: any;

        for(let i = 0; i < expenses.length; i++) {
            if(this.sortParams.sortBy === 'date') {
                newField = new Date(expenses[i].date).getMonth()+1;
            } else if(this.sortParams.sortBy === 'category') {
                newField = expenses[i].category;
            } else {
                newField = expenses[i].amount;
            }
            if(fieldsArray.indexOf(newField) === -1) {
                fieldsArray.push(newField);
                this.expenseList[fieldsArray.length-1] = [];
            }
            this.expenseList[fieldsArray.length-1].push(expenses[i]);
        }
    }

    getAllExpenses(params? :any) {
        if(!params) {
            params = '?_sort=' + this.sortParams.sortBy + '&_order=' + this.sortParams.sortOrder;
        }
        this._ExpenseService.getExpenses(params).subscribe(
            expenses => {
                this.seggregateExpenses(expenses);
                this.calculateExpenses(false)},
            error => this.errorText = error
        )
    }

    ngOnInit() : void {
        this.getAllExpenses();
    }
}