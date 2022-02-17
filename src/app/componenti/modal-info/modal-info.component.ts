import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AgendinaService } from 'src/app/services/agendina.service';

@Component({
  selector: 'modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {

  @Input() dettaglio: any;
  @Output() submit = new EventEmitter();

  elements: any;
  giornaliere: any;
  combo: any;
  attivita: any;
  orario: any
  loading_btn: boolean = false
  selezionato: any;

  constructor(private service: AgendinaService) { }

  ngOnInit() {
    this.getDettaglioAttivita()
    this.getCombo()
  }


  ngOnChanges() {
    if (this.giornaliere) {
      this.elements = this.giornaliere.filter((i: { id_registro: any; }) => i.id_registro == this.dettaglio.id_registro);
    }
  }


  onSubmitNewAttivita(ele: any) {
    if (this.loading_btn) return
    this.loading_btn = true
    let payload = {
      id_attivita: ele.id_attivita,
      id_orario: ele.id_orario,
      id_registro: this.dettaglio.id_registro
    }
    this.setGiornaliero(payload)
  }

  onSelectAttivita(ele: any) {
    this.selezionato = ele
  }

  onDeleteAttivita() {
    if (this.loading_btn) return

    this.loading_btn = true
    this.delGiornaliero(this.selezionato)
  }

  getDettaglioAttivita() {

    this.giornaliere = null
    this.service.getDettaglioAttivita()
      .subscribe({
        next: (result: any) => {
          this.giornaliere = result
          if (this.dettaglio)
            this.elements = this.giornaliere.filter((i: { id_registro: any; }) => i.id_registro == this.dettaglio.id_registro);
        },
        error: (error: any) => {
          console.log(error)
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
          console.log(error)
        },
      })
  }

  setGiornaliero(payload: any) {

    this.service.setGiornaliero(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.getDettaglioAttivita()
          this.submit.emit(true)
        },
        error: (error: any) => {
          console.log(error)
        },
      })
  }

  delGiornaliero(payload: any) {

    this.service.delGiornaliero(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.getDettaglioAttivita()
          this.submit.emit(true)
        },
        error: (error: any) => {
          console.log(error)
        },
      })
  }
}
