import { TokenInterceptorService } from './services/token-interceptor.service';

import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavibarComponent } from './components/navibar/navibar.component';
import { LoginLogoutComponent } from './components/login-logout/login-logout.component';
import { MainComponent } from './components/main/main.component';
import { LeftComponent } from './components/left/left.component';
import { RightComponent } from './components/right/right.component';
import { MidComponent } from './components/mid/mid.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserGreetComponent } from './components/user-greet/user-greet.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';



@NgModule({
  declarations: [
    AppComponent,
    NavibarComponent,
    LoginLogoutComponent,
    MainComponent,
    LeftComponent,
    RightComponent,
    MidComponent,
    FooterComponent,
    UserGreetComponent,
    LandingpageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule


  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
