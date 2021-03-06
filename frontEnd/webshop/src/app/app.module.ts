import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import services...
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CartService } from './services/cart.service';
import { ListingService } from './services/listing.service';
import { ProductService } from './services/product-service.service';
import { PaymentService } from './services/payment.service';
import { OrdersService } from './services/orders.service';

// import components...
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
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';


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
    WishListComponent,
    OrdersComponent,
    ProfileComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    AuthService,
    PaymentService,
    ListingService,
    CartService,
    OrdersService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
