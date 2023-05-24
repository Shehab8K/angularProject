import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { FormMainInfoComponent } from './components/register/form-main-info/form-main-info.component';
import { FormDiscordComponent } from './components/register/form-discord/form-discord.component';
import { FormCharacterComponent } from './components/register/form-character/form-character.component';
// import { GameCardComponent } from './components/game-card/game-card.component';
// import { FiltersComponent } from './components/filters/filters.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { UnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminOnlyComponent } from './components/admin-only/admin-only.component';
import { UserOnlyComponent } from './components/user-only/user-only.component';
import { AuthOnlyComponent } from './components/auth-only/auth-only.component';
import { OrdersComponent } from './components/orders/orders.component';
// import { OrderItemComponent } from './order-item/order-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { WidgetComponent } from './components/dashboard/widget/widget.component';
import { ChartoneComponent } from './components/dashboard/chartone/chartone.component';
import { TitleComponent } from './components/dashboard/title/title.component';
import { UsersTableComponent } from './components/dashboard/users/users-table/users-table.component';
// import { MatSidenavModule } from '@angular/material/select';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { CreditCardComponent } from './components/payment/credit-card/credit-card.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { PaymentComponent } from './components/payment/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCardsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    FormMainInfoComponent,
    FormDiscordComponent,
    FormCharacterComponent,
    // GameCardComponent,
    // FiltersComponent,
    AllGamesComponent,
    ChartComponent,
    LoginComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    ForbiddenComponent,
    UnauthorizedComponent,
    AdminOnlyComponent,
    UserOnlyComponent,
    AuthOnlyComponent,
    OrdersComponent,
    OrderItemComponent,
    CreditCardComponent,

    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    WidgetComponent,
    ChartoneComponent,
    TitleComponent,
    UsersTableComponent,
    UserNavComponent,
    DashboardHomeComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,

    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class HomeCardsModule { }
