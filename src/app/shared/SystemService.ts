import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class SystemService {
  //API Common Method
  private baseAPIUrl = "https://localhost:7172";

  constructor(public http: HttpClient) {
    //this.SetHttpOptions();
  }

  ExecuteAPI_Get<T>(action: string, params: any = {}): Observable<T> {
    var apiUrl = this.baseAPIUrl;
    action = apiUrl + '/' + action;

    return this.http.get<T>(action, { params: params, headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}