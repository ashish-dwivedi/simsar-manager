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
    clicked: boolean = false;

    constructor(private _ShoppingService: ShoppingService) {}

    ngOnInit() {
        this._ShoppingService.getShoppingList().subscribe(
            data => {this.shoppingList = data; this.openForEdit({}, true)},
            error => console.log('Could not get the shopping list!')
        );
    }

    addNewList() {
        let newId = Math.random();
        let newList: any = { title: 'New List', list: [{name: ''}], id: newId, new: true };
        this.shoppingList.unshift(newList);
    }

    addNewItem(listItem) {
        if(listItem.list[listItem.list.length-1]['name'] !== '') {
            listItem.list.push({name: ''});
        }
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
        this.openForEdit(listToUpdate);
    }

    openForEdit(listItem: any, pageLoad? :boolean) {
        let i: number;
        if(!pageLoad) {
            // Toggle individual lists status
            listItem.clicked = listItem.clicked ? !listItem.clicked : true;
        } else {
            // Close all open lists
            for(i=0; i<this.shoppingList.length; i++) {
                this.shoppingList[i]['clicked'] = false;
            }
        }
    }
}