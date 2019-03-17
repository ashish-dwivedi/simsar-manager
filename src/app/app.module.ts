import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { ModalComponent } from "./modal/modal.component";
import { ExpenseService } from './expenses/expense.service';
import { ShoppingService } from "./shopping/shopping.service";
import { TooltipDirective } from './common/tooltip.directive';
import { ExpenseComponent } from './expenses/expenses.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ChartsComponent } from './common/charts/charts.component';
import { AddExpenseComponent } from './expenses/expense.add.component';
import { NotificationService } from "./notification/notification.service";
import { NotificationComponent } from './notification/notification.component';
import { DeleteConfirmation } from "./delete-confirmation/delete.confirmation.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // ModalComponent,
    ChartsComponent,
    TooltipDirective,
    ExpenseComponent,
    ShoppingComponent,
    DeleteConfirmation,
    AddExpenseComponent,
    NotificationComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ChartsModule,
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: 'home', component:HomeComponent},
      {path: 'expenses', component: ExpenseComponent},
      {path: 'shopping', component: ShoppingComponent},
      {path: '', redirectTo: 'home', pathMatch:'full'},
      {path: 'notification', component: NotificationComponent}
    ])
  ],
  providers: [ExpenseService, ShoppingService, NotificationService],
  entryComponents: [AddExpenseComponent, DeleteConfirmation, ChartsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
