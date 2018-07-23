import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewIceCreamComponent } from './new-ice-cream/new-ice-cream.component';
import { AppRouting } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingListPreviewComponent } from './new-ice-cream/shopping-list-preview/shopping-list-preview.component';
import { IceCreamPreviewComponent } from './new-ice-cream/ice-cream-preview/ice-cream-preview.component';
import { SummaryComponent } from './new-ice-cream/summary/summary.component';
import { HttpService } from './shared/services/http.service';
import { CalculationService } from './shared/services/calculation.service';
import { CustomMaxDirective } from './shared/directives/customMax.directive';
import { CustomMinDirective } from './shared/directives/customMin.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewIceCreamComponent,
    PageNotFoundComponent,
    ShoppingListComponent,
    ShoppingListPreviewComponent,
    IceCreamPreviewComponent,
    SummaryComponent,
    CustomMaxDirective,
    CustomMinDirective
    ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, ShoppingListService, CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
