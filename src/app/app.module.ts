import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarioComponent } from './view/calendario/calendario.component';
import { TodayComponent } from './view/today/today.component';
import { MyFooterComponent } from './componenti/my-footer/my-footer.component';
import { FormsModule } from '@angular/forms';
import { ModalInfoComponent } from './componenti/modal-info/modal-info.component';
import { MySpinnerComponent } from './componenti/my-spinner/my-spinner.component';
import { MyToastComponent } from './componenti/my-toast/my-toast.component';
import { MyTitoloComponent } from './componenti/my-titolo/my-titolo.component';
import { RoutineComponent } from './view/routine/routine.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    TodayComponent,
    MyFooterComponent,
    ModalInfoComponent,
    MySpinnerComponent,
    MyToastComponent,
    MyTitoloComponent,
    RoutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
