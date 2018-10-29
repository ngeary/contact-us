import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubmitterService {

  contactUsUrl = 'http://interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com/contact-us/send';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  postMessage(message: string): Observable<string> {
    return this.http.post<string>(this.contactUsUrl, message, this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred. Msg: ', error.error.message);
    } else {
      console.error(
        'A back-end error occurred. Status code: ' + error.status +
        '\nMsg: ' + error.error);
    }
    // return an observable with a user-facing error message
    return throwError('An error occurred. Please try again later.');
  }

}
