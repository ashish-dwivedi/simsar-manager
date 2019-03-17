import { Component } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styles: ['.home-img {width: 60%; height: 60%; margin-left: calc(50% - 400px)}']
})
export class HomeComponent {
    homeImageUrl:string = '../img/family.jpg';
}