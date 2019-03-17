import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl : './delete-confirmation.html',
})
export class DeleteConfirmation {
    @Input() modalData: any;

    constructor(private _NgbActiveModal: NgbActiveModal) {};

    closeModalSuccess() {
        this._NgbActiveModal.close();
    }

    closeModalFailure() {
        this._NgbActiveModal.dismiss();
    }
}