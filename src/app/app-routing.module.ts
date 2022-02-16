import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './view/calendario/calendario.component';
import { CommissioniComponent } from './view/commissioni/commissioni.component';
import { TodayComponent } from './view/today/today.component';


const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'commissioni', component: CommissioniComponent },
  { path: 'today', component: TodayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
