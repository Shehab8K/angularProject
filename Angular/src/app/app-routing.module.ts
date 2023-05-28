import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ForbiddenComponent } from './components/errors/forbidden/forbidden.component';
import { AdminOnlyComponent } from './components/admin-only/admin-only.component';
import { UserOnlyComponent } from './components/user-only/user-only.component';
import { AuthOnlyComponent } from './components/auth-only/auth-only.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { NotfoundComponent } from './components/errors/notfound/notfound.component';

import { DashboardComponent } from './components/dashboard/dashboard.component'
import { UsersTableComponent } from './components/dashboard/users/users-table/users-table.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-products/dashboard-products.component';
import { DashboardProductDetailsComponent } from './components/dashboard/dashboard-product-details/dashboard-product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameShowComponent } from './components/game-show/game-show.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { DashboardOrdersComponent } from './components/dashboard/dashboard-orders/dashboard-orders.component';
import { CreateProductComponent } from './components/dashboard/create-product/create-product.component';
const routes: Routes = [

  // All users + guests
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'games',component:AllGamesComponent},
  {path:'games/:id',component:GameShowComponent},
  {path:'cart',component:CartComponent},

  // Only Admins and users
  {
    path: "",
    canActivate:[AuthGuard],
    canActivateChild: [AuthGuard],
    children:[
      {path:'payment',component:PaymentComponent},
      {path:'orders',component:OrdersComponent},
      {path:'profile',component:ProfileComponent},
    ]
  },

  // Only Admins Routes
  {
    path:'dashboard',
    canActivate: [AdminGuard],
    canActivateChild:[AdminGuard],
    component:DashboardComponent,
    children: [
      {path:'', component:DashboardHomeComponent},
      {path:'users', component:UsersTableComponent},
      {path:'games',component:DashboardProductsComponent},
      {path:'games/add',component:CreateProductComponent},
      {path:'orders',component:DashboardOrdersComponent},
      {path:'games/:id',component:CreateProductComponent}
    ]
  },


  // Error routes
  { path: '403', component: ForbiddenComponent },

  // Checking auth demo routes
  { path: 'admin', component: AdminOnlyComponent, canActivate: [AdminGuard] },
  { path: 'user', component: UserOnlyComponent, canActivate: [UserGuard] },
  { path: 'auth', component: AuthOnlyComponent, canActivate: [AuthGuard] },

  // Other PAths
  { path: '**', component: NotfoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
