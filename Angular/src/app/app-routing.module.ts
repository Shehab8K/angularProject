import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { FiltersComponent } from './components/filters/filters.component';

const routes: Routes = [
  {path:'games',component:AllGamesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
