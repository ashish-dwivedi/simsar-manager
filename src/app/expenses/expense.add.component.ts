import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseService } from "./expense.service";
import { IExpense } from './expense';


@Component({
    templateUrl: './expense.add.component.html',
    styles: [
        'input { line-height: 25px; padding: 0 10px; width: 100%; }',
        '.modal-rows { margin-top: 10px }',
        '.expense-id { background-color: #d2d2d2; line-height: 25px; padding: 0 10px; }',
        '.select-category { height: 25px; width: 100%; }'
    ]
})
export class AddExpenseComponent {
    @Input() modalData: any;
    expenseCategories: string[] = ['Grocery & Misc', 'Travel', 'D2D Purchases', 'Bill Payment & Recharge', 'Transfers'];

    constructor(private _NgbActiveModal: NgbActiveModal, private _ExpenseService: ExpenseService) {}

    addExpense() {
        let data = <IExpense>this.modalData.data;
        this._ExpenseService.addUpdateExpense(data, this.modalData.mode).subscribe(
            data => {this.modalData.response = data; location.reload()},
            error => this.modalData.response = error
        )
    }

    close(message: string) {
        this._NgbActiveModal.dismiss(message);
    }
}