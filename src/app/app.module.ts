import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './services/category.service';
import { HttpModule } from '@angular/http';
import { OrderPlaceComponent } from './order-place/order-place.component';

const appRoutes = [
  { path: 'orderFoodHomePage', component: CategoryComponent },
  { path: 'orderPlaced', component: OrderPlaceComponent },
  { path: '', redirectTo: 'orderFoodHomePage', pathMatch: 'full' } 
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    OrderPlaceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpModule,
    BlockUIModule.forRoot()
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
