import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

// if you did not install @angular/animations, this is what you use
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// angular material components must be imported separately, always check
// https://material.angular.io/components/categories for up to date import paths and <tags></tags>
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { CartService } from './services/cart.service';
import { ListingService } from './services/listing.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/payment.service';



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
import { MenuComponent } from './components/menu/menu.component';
import { CollectionFilterComponent } from './components/collection-filter/collection-filter.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SuccessComponent } from './components/success/success.component';
import { StoneFilterComponent } from './components/stone-filter/stone-filter.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { FavComponent } from './components/fav/fav.component';



 



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
    MenuComponent,
    CollectionFilterComponent,
    CheckoutComponent,
    AddressComponent,
    PaymentComponent,
    SuccessComponent,
    StoneFilterComponent,
    PriceFilterComponent,
    FavComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCheckboxModule

    


  ],
  providers: [
    AuthService,
    PaymentService,
    ListingService,
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
