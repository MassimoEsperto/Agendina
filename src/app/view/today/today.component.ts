import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AgendinaService } from 'src/app/services/agendina.service';

@Component({
  selector: 'today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  loading_btn: boolean = false
  loading_page: boolean = true
  errore: string = "";
  giornaliero: any
  title: string = "";

  view_buongiorno: boolean = false

  constructor(private service: AgendinaService) { }

  ngOnInit() {
    this.getGiornaliero()
  }

  onUpdGiornaliero(ele: any, chose: number) {
    if (this.loading_page) return
    this.loading_page = true

    let payload = {
      id: ele.id,
      is_fatto: chose
    }

    this.updGiornaliero(payload)
  }

  //chiamata ai servizi
  getGiornaliero() {

    this.loading_page = true

    this.service.getGiornaliero()
      .pipe(finalize(() => this.loading_page = false))
      .subscribe({
        next: (result: any) => {
          this.view_buongiorno = Boolean(result.today.buongiorno)
          if (this.view_buongiorno) {
            setTimeout(() => {
              this.view_buongiorno = false
              this.giornaliero = result
              this.title = "OGGI " + this.giornaliero.today.giorno + " " + this.giornaliero.today.mese
            }, 5000);
          } else {
            this.giornaliero = result
            this.title = "OGGI " + this.giornaliero.today.giorno + " " + this.giornaliero.today.mese
          }


        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }

  updGiornaliero(payload: any) {

    this.service.updGiornaliero(payload)
      .subscribe({
        next: (result: any) => {
          this.getGiornaliero()
        },
        error: (error: any) => {
          this.errore = error
        },
      })
  }
}
