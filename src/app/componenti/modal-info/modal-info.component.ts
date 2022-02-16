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
  attivita: any;
  selezionata: any
  loading_btn: boolean = false

  constructor(private service: AgendinaService) { }

  ngOnInit(){
   this.reload()
  }

  reload(){
    this.getDettaglioAttivita()
    this.getAllAttivita()
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
      id_registro: this.dettaglio.id_registro
    }
    this.setGiornaliero(payload)
  }

  getDettaglioAttivita() {

    this.giornaliere=null
    this.service.getDettaglioAttivita()
      .subscribe({
        next: (result: any) => {
          this.giornaliere = result
          if(this.dettaglio)
          this.elements = this.giornaliere.filter((i: { id_registro: any; }) => i.id_registro == this.dettaglio.id_registro);
        },
        error: (error: any) => {
          console.log(error)
        },
      })
  }

  getAllAttivita() {

    this.service.getAttivita()
      .subscribe({
        next: (result: any) => {

          this.attivita = result
       
        },
        error: (error: any) => {
          // this.errore = error
        },
      })
  }

  setGiornaliero(payload: any) {

    this.service.setGiornaliero(payload)
      .pipe(finalize(() => this.loading_btn = false))
      .subscribe({
        next: (result: any) => {
          this.reload()
          this.submit.emit(true)
        },
        error: (error: any) => {
          console.log(error)
        },
      })
  }
}
