import { CartService } from './services/cart.service';
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

import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';



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
    LandingpageComponent,
    ImageSliderComponent,
    CartComponent,
    ProductDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule


  ],
  providers: [
    AuthService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
