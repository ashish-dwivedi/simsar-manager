import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './modal/component.html'
})
export class ModalComponent {
    @Input() mode: string;
}