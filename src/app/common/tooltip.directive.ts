import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
    // templateUrl: 'tooltip.component.html',
    selector: '[sm-tooltip]',
    // styles: []
})
export class TooltipDirective implements OnInit {
    @Input() tooltip: string;
    @Input() tooltipPosition: string;
    hovered: boolean = false;

    constructor(private ele: ElementRef) {}

    ngOnInit() {
        let eleTop, eleLeft, eleHeight, eleWidth, tooltipPosition;
        this.ele.nativeElement.addEventListener('mouseover', function() {
            this.hovered = true;
            setTimeout(() => {
                if(this.hovered === true) {
                    eleTop = this.getBoundingClientRect().top;
                    eleLeft = this.getBoundingClientRect().left;
                    eleHeight = this.offsetHeight;
                    eleWidth = this.offsetWidth;
                    this.tooltipPosition = this.tooltipPosition ? this.tooltipPosition : 'top';
                    if(this.tooltipPosition === 'top') {
                        eleTop -= (eleHeight/2);
                    } else if(this.tooltipPosition === 'bottom') {
                        eleTop += (eleHeight/2);
                    } else if(this.tooltipPosition === 'left') {
                        eleLeft -= (eleWidth/2);
                    } else if(this.tooltipPosition === 'right') {
                        eleLeft += (eleWidth/2);
                    }
                    let tooltipTagString = '<div class= "tooltip" style= "position:fixed;top:' +
                     eleTop + ';left:' + eleLeft +'">' + this.tooltip + '</div>';
                     let tooltipTag = document.createElement(tooltipTagString);
                    document.body.appendChild(tooltipTag);
                }
            }, 1000)
        });
        this.ele.nativeElement.addEventListener('mouseout', function() {
            this.hovered = false;
        });
    }
}