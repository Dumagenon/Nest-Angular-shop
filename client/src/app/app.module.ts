import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './header/cart/cart.component';
import { CatalogComponent } from './catalog-page/catalog/catalog.component';
import { SortsComponent } from './catalog-page/sorts/sorts.component';
import { reducers } from './reducers';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TokenInterceptor } from './classes/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CatalogPageComponent,
    HeaderComponent,
    CartComponent,
    CatalogComponent,
    SortsComponent,
    SignupPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
