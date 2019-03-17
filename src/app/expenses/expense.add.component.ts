import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseService } from "./expense.service";
import { IExpense } from './expense';


@Component({
    templateUrl: './expense.add.component.html',
    styles: [
        'input { line-height: 25px; padding: 0 10px; width: 100%; }',
        '.modal-rows { padding: 6px }',
        '.expense-id { background-color: #d2d2d2; line-height: 25px; padding: 0 10px; }',
        '.select-category { height: 25px; width: 100%; }'
    ]
})
export class AddExpenseComponent {
    @Input() modalData: any;
    error: string = '';
    expenseCategories: string[] = ['Grocery & Misc', 'Travel', 'D2D Purchases', 'Bill Payment & Recharge',
        'Transfers', 'In-Claim', 'Cash'];

    constructor(public _NgbActiveModal: NgbActiveModal, private _ExpenseService: ExpenseService) {}

    addExpense() {
        this.error = '';
        if(!this.modalData.data.amount || !this.modalData.data.category || 
            this.modalData.data.amount == null || this.modalData.data.category == null) {
            this.error = 'Please provide input for mandatory fields!';
            return;
        }
        let data = <IExpense>this.modalData.data;
        this._ExpenseService.addUpdateExpense(data, this.modalData.mode).subscribe(
            data => {this.modalData.response = data;this.close('success')},
            error => this.modalData.response = error
        )
    }

    close(message: string) {
        this._NgbActiveModal.close(message);
    }
}
