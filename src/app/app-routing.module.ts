import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './view/calendario/calendario.component';
import { RoutineComponent } from './view/routine/routine.component';
import { TodayComponent } from './view/today/today.component';


const routes: Routes = [
  { path: '', redirectTo: '/today', pathMatch: 'full' },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'routine', component: RoutineComponent },
  { path: 'today', component: TodayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
