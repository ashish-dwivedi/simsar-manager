import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expenses/expenses.component';
import { ShoppingComponent } from './shopping/shopping.component';
// import { FallbackComponent } from './fallback/fallback.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpenseComponent,
    ShoppingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'home', component:HomeComponent},
      {path: 'expenses', component: ExpenseComponent},
      {path: 'shopping', component: ShoppingComponent},
      {path: '', redirectTo: 'home', pathMatch:'full'}
      // {path: '**', component: FallbackComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
