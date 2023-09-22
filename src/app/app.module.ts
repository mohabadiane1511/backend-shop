import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';
import { CouponsModule } from './components/coupons/coupons.module';
import { PagesModule } from './components/pages/pages.module';
import { MediaModule } from './components/media/media.module';
import { MenusModule } from './components/menus/menus.module';
import { VendorsModule } from './components/vendors/vendors.module';
import { UsersModule } from './components/users/users.module';
import { LocalizationModule } from './components/localization/localization.module';
import { InvoiceModule } from './components/invoice/invoice.module';
import { SettingModule } from './components/setting/setting.module';
import { ReportsModule } from './components/reports/reports.module';
import { AuthModule } from './components/auth/auth.module';
import { LivraisonModule } from './components/livraison/livraison.module';
import { DetailinvoiceModule } from './components/detailinvoice/detailinvoice.module';
//import { SearchFilterPipe } from '../app/search-filter.pipe';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    DetailinvoiceModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    CouponsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    HttpClientModule,
    LivraisonModule
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
