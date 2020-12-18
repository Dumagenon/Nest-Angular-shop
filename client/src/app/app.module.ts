import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './header/cart/cart.component';
import { CatalogComponent } from './catalog-page/catalog/catalog.component';
import { SortsComponent } from './catalog-page/sorts/sorts.component';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    CatalogPageComponent,
    HeaderComponent,
    CartComponent,
    CatalogComponent,
    SortsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
