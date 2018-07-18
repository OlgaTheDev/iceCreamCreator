import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewIceCreamComponent } from './new-ice-cream/new-ice-cream.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'new', component: NewIceCreamComponent},
    {path: 'new/:type', component: NewIceCreamComponent},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouting {}