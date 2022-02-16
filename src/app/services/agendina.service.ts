import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendinaService {

  errore:string=""
  constructor(private http: HttpClient) {
  }

  buildURL(operation: string = ""): string {

    let URL: string = `http://miagenda.altervista.org/web-services/applicazione/`;

    URL = URL + operation + ".php"

    return URL

  }

  handleError(response: HttpErrorResponse) {
    console.log("errore:", response)
    let message = response.error ? response.error.message : response
    return throwError(message);
  }




  getRegistro(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_registro")}`).pipe(
      map((res:any) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getAttivita(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_attivita")}`).pipe(
      map((res:any) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getCombo(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_combo")}`).pipe(
      map((res:any) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  updAttivita(payload: any) {

    return this.http.post(`${this.buildURL("upd_attivita")}`, { data: payload })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  setAttivita(payload: any) {

    return this.http.post(`${this.buildURL("set_attivita")}`, { data: payload })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  setGiornaliero(payload: any) {

    return this.http.post(`${this.buildURL("set_giornaliero")}`, { data: payload })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }

  getDettaglioAttivita(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_dettaglio")}`).pipe(
      map((res:any) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  getGiornaliero(): Observable<any[]> {
    return this.http.get(`${this.buildURL("get_giornaliero")}`).pipe(
      map((res:any) => {

        return res['data'];

      }),
      catchError(this.handleError));
  }

  updGiornaliero(payload: any) {

    return this.http.post(`${this.buildURL("upd_giornaliero")}`, { data: payload })
      .pipe(map((res) => {
        return 'ok';
      }),
        catchError(this.handleError));
  }
}
