import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavibarComponent } from './navibar/navibar.component';
import { LoginLogoutComponent } from './login-logout/login-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavibarComponent,
    LoginLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
