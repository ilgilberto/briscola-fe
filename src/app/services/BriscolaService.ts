import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable,  of,  retry, throwError } from 'rxjs';
import { Status } from '../domain/Status';
import { Message } from '../domain/Message';


@Injectable()
export class BriscolaService {
  constructor(private http: HttpClient) {}

  startGame(): Observable<HttpResponse<Status>> {
    return this.http.get<Status>(
      '/briscolarestservices/briscola/startGame',
      { observe: 'response', responseType: 'json' }
    ).pipe(
        retry(3),
        catchError(err => {
          return throwError(() =>  this.handleError(err))
        })
    )
  }

  giocaPersona(turno:number,carta:string): Observable<HttpResponse<Status>> {
    return this.http.post<Status>(
      '/briscolarestservices/briscola/giocaUmano',{} ,
      { observe: 'response', responseType: 'json',params:{turno:turno,carta:carta} }
    ).pipe(
        retry(3),
        catchError(err => {
          return throwError(() =>  this.handleError(err))
        })
    )
  }

  giocaComputer(turno:number): Observable<HttpResponse<Status>> {
    return this.http.post<Status>(
      '/briscolarestservices/briscola/giocaComputer', {},
      { observe: 'response', responseType: 'json',params: {turno:turno} }
    ).pipe(
        retry(3),
        catchError(err => {
          return throwError(() =>  this.handleError(err))
        })
    )
  }

  insertMessage(message:Message): Observable<HttpResponse<number>> {
    alert(message.content);
    return this.http.post<number>(
      '/briscolarestservices/sendMessage', message,
      { observe: 'response', responseType: 'json' }
    ).pipe(
        retry(3),
        catchError(err => {
          return throwError(() =>  this.handleError(err))
        })
    )
  }

  handleError(e: any){
     alert("Si è verificato un errore nella connessione con il server:\ncodice dell'errore "+e.status+"\n("+e.message+")");
     console.log("ERRORE NELLA CHIAMATA AL SERVER",e);
  }
}
