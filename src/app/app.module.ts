import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExpenseService } from './expenses/expense.service';
import { ShoppingService } from "./shopping/shopping.service";
import { TooltipDirective } from './common/tooltip.directive';
import { ExpenseComponent } from './expenses/expenses.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AddExpenseComponent } from './expenses/expense.add.component';
import { NotificationService } from "./notification/notification.service";
import { NotificationComponent } from './notification/notification.component';
import { DeleteConfirmation } from "./delete-confirmation/delete.confirmation.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TooltipDirective,
    ExpenseComponent,
    ShoppingComponent,
    DeleteConfirmation,
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
  providers: [ExpenseService, ShoppingService, NotificationService],
  entryComponents: [AddExpenseComponent, DeleteConfirmation],
  bootstrap: [AppComponent]
})
export class AppModule {}
