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
        let newList: any = { title: 'New List', list: [{name: ''}], id: newId, new: true };
        this.shoppingList.push(newList);
    }

    addNewItem(listItem) {
        listItem.list.push({name: ''});
    }

    removeList(listToRemove, indexToRemove) {
        this._ShoppingService.removeList(listToRemove.id).subscribe(
            data => {console.log(data);this.shoppingList.splice(indexToRemove, 1);},
            error => console.log(error)
        );
    }

    updateList(listToUpdate) {
        if(!listToUpdate.new) {
            this._ShoppingService.updateList(listToUpdate).subscribe();
        } else {
            listToUpdate.new = false;
            this._ShoppingService.persistNewList(listToUpdate).subscribe();
        }
    }
}