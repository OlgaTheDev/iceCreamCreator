import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewIceCreamComponent } from './new-ice-cream/new-ice-cream.component';
import { AppRouting } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IceCreamService } from './ice-cream.service';
import { HttpService } from './http.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingListPreviewComponent } from './new-ice-cream/shopping-list-preview/shopping-list-preview.component';
import { StartComponent } from './new-ice-cream/start/start.component';
import { IceCreamPreviewComponent } from './new-ice-cream/ice-cream-preview/ice-cream-preview.component';
import { SummaryComponent } from './new-ice-cream/summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewIceCreamComponent,
    PageNotFoundComponent,
    ShoppingListComponent,
    ShoppingListPreviewComponent,
    StartComponent,
    IceCreamPreviewComponent,
    SummaryComponent
    ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [IceCreamService, HttpService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
