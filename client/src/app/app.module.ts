import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/header/cart/cart.component';
import { CatalogComponent } from './components/catalog-page/catalog/catalog.component';
import { SortsComponent } from './components/catalog-page/sorts/sorts.component';
import { reducers } from './reducers';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import HttpInterceptorProvider from './providers/http.interceptor.provider';
import SocialAuthServiceProvider from './providers/social-auth.provider';
import { env } from './utils/constants';
import { ChatComponent } from './components/chat/chat.component';
import { SocketIoModule } from 'ngx-socket-io';

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
    ChatComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    SocketIoModule.forRoot({ url: env.WS_HOST }),
  ],
  providers: [HttpInterceptorProvider, SocialAuthServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
