import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AgendinaService } from 'src/app/services/agendina.service';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  constructor(private service: AgendinaService) { }

  dettaglio: any
  calendario: any
  calendari: any
  loading_btn: boolean = false
  loading_page: boolean = true
  errore: string = "";
  indice: number = 0;

  ngOnInit() {
    this.getRegistriAttivita()
  }

  reload() {
    this.getRegistriAttivita()
  }

  selezionaGiorno(selezionato: any) {
    let num: number = Number(selezionato.giorno) || 0

    if (num > 0) {
      this.clearSelezione()
      selezionato.attivo = true
      this.dettaglio = selezionato
    }
  }

  clearSelezione() {
    for (let settimana of this.calendario.lista) {
      for (let giorno of settimana) {
        giorno.attivo = false
      }
    }
  }


  //chiamata ai servizi
  getRegistriAttivita() {

    this.loading_page = true

    this.service.getRegistro()
      .pipe(finalize(() => this.loading_page = false))
      .subscribe({
        next: (result: any) => {

          this.calendari = result
          for(let i=0;i<this.calendari.length;i++){
            if(this.calendari[i].id_mese == (new Date().getMonth() + 1).toString())
          {
            this.indice=i
          }
            
          }
         
          this.calendario = this.calendari[this.indice]
          if (!this.dettaglio)
            this.dettaglio = this.calendario['lista'][0]
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }

  nexMese(nex: number) {

    let len = this.calendari.length
    let scelto: number = this.indice + nex
    if (scelto > -1 && scelto < len) {
      this.indice = scelto
      this.calendario = this.calendari[this.indice]
    }

  }


}
