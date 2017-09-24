import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
    templateUrl : './charts.component.html',
    styles: ['.modal-body .material-icons {font-size: 18px}']
})
export class ChartsComponent implements OnInit {
    @Input() modalData: any = {};
    chartLabels:string[];
    chartData:number[] = [];
    chartType:string = '';
    message: string;

    constructor(private _NgbActiveModal : NgbActiveModal) {}

    chartHovered() {}
    chartClicked(event) {
        console.log(event);
        this.message = 'You spent ' + event + 'in this duration';
    }

    switchChartType(type) {
        this.chartType = type;
    }

    closeModal() {
        this._NgbActiveModal.close();
    }

    ngOnInit() {
        this.chartLabels = this.modalData.labels;
        this.chartData = this.modalData.data;
        this.chartType = this.modalData.type;
    }
}