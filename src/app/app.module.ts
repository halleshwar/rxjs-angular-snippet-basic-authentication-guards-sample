import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AdminComponent} from './features/admin/admin.component';
import {LoginComponent} from './features/login/login.component';
import {HomeComponent} from './features/home/home.component';
import {IfloggedDirective} from './features/services/iflogged.directive';

import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './features/services/auth.guard';
import {AuthInteceptor} from './features/services/auth.interceptor';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    IfloggedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ], 
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInteceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
