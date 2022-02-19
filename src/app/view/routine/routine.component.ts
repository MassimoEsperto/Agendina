import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AgendinaService } from 'src/app/services/agendina.service';

@Component({
  selector: 'routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit {

  loading_btn: boolean = false
  loading_page: boolean = false
  errore: string = "";
  view: boolean = true
  nuovo: boolean = false
  attivita: any
  selezionata: any

  combo: any
  aggiungere = {
    nome: '',
    descrizione: '',
    id_tipo: 1
  }
  title: string = "GESTIONE ROUTINE"

  constructor(private service: AgendinaService) { }

  ngOnInit() {
    this.getAttivita()
    this.getCombo()
  }

  onUpdAttivita(ele: any) {
    this.view = false
    this.selezionata = ele
  }

  onDelAttivita(ele: any) {
    this.selezionata = ele
  }

  onSetAttivita() {
    this.view = false
    this.nuovo = true
  }

  onSubmitInsert(input: any) {
    if (this.loading_btn) return
    this.loading_page = true
    this.setAttivita(input)
  }

  onSubmitUpdate(sel: any) {
    if (this.loading_btn) return
    this.loading_page = true
    this.updAttivita(sel)
  }

  annullaForm() {
    this.view = true
    this.nuovo = false
  }

  onDeleteAttivita() {
    this.delAttivita(this.selezionata)
  }

  //chiamata ai servizi

  getAttivita() {

    this.loading_page = true

    this.service.getAttivita()
      .pipe(finalize(() => this.loading_page = false))
      .subscribe({
        next: (result: any) => {

          this.attivita = result
          this.view = true
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }

  getCombo() {

    this.service.getCombo()
      .subscribe({
        next: (result: any) => {

          this.combo = result
        },
        error: (error: any) => {
          console.log(error);
        },
      })
  }


  updAttivita(payload: any) {

    this.service.updAttivita(payload)
      .pipe(finalize(() => this.loading_page = false))
      .subscribe({
        next: (result: any) => {

          this.getAttivita()
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }

  setAttivita(payload: any) {

    this.service.setAttivita(payload)
      .pipe(finalize(() => this.loading_page = false))
      .subscribe({
        next: (result: any) => {

          this.getAttivita()
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }

  delAttivita(payload: any) {

    this.service.delAttivita(payload)
      .subscribe({
        next: (result: any) => {

          this.getAttivita()
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }
}
