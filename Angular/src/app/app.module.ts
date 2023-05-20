import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './components/register/register.component';
import { FormMainInfoComponent } from './components/register/form-main-info/form-main-info.component';
import { FormDiscordComponent } from './components/register/form-discord/form-discord.component';
import { FormCharacterComponent } from './components/register/form-character/form-character.component';
// import { GameCardComponent } from './components/game-card/game-card.component';
// import { FiltersComponent } from './components/filters/filters.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeCardsComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    TestComponent,
    RegisterComponent,
    FormMainInfoComponent,
    FormDiscordComponent,
    FormCharacterComponent,
    // GameCardComponent,
    // FiltersComponent,
    AllGamesComponent,
    OrdersComponent,
    OrderItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class HomeCardsModule { }
