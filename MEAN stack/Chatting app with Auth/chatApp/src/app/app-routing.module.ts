import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  }, {
    path: 'register',
    loadChildren: './registration/registration.module#RegistrationModule'
  }, {
    path: 'home/:userId',
    loadChildren: './home/home.module#HomeModule'
  }, {
    path: '**',
    redirectTo: '/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
