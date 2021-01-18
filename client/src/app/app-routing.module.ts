import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './classes/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CatalogPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
