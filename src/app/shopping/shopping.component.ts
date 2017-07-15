import { Component, OnInit } from '@angular/core';
import { IShopping } from './shopping';
import { ShoppingService } from './shopping.service';


@Component({
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
    staticRows: number[] = [1, 2, 3];
    shoppingList: IShopping[] = [];

    constructor(private _ShoppingService: ShoppingService) {}

    ngOnInit() {
        this._ShoppingService.getShoppingList().subscribe(
            data => this.shoppingList = data,
            error => console.log('Could not get the shopping list!')
        );
    }

    addNewList() {
        let newId = Math.random();
        let newList: any = { title: 'My new list', list: [], id: newId }
        this.shoppingList.push(newList);
    }

    // saveNewList() {

    // }
}