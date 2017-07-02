import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expenses/expenses.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AddExpenseComponent } from './expenses/expense.add.component';
import { ExpenseService } from "app/expenses/expense.service";
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from "app/notification/notification.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    ShoppingComponent,
    AddExpenseComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'home', component:HomeComponent},
      {path: 'expenses', component: ExpenseComponent},
      {path: 'shopping', component: ShoppingComponent},
      {path: 'notification', component: NotificationComponent},
      {path: '', redirectTo: 'home', pathMatch:'full'}
    ])
  ],
  providers: [ExpenseService, NotificationService],
  entryComponents: [AddExpenseComponent],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  constructor(private _NotificationService: NotificationService) {}

  ngOnInit() {
    alert(this._NotificationService.getNotificationsList());
  }
}
