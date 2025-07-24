import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingCheckerService {
  constructor(private http: HttpClient) {}

  ping(ip: string, type: string): Observable<string> {
    if (type === 'once') {
      return this.http.post(
        'http://localhost:3000/ping-once',
        { ip },
        { responseType: 'text' }
      );
    } else {
      return this.http.post(
        'http://localhost:3000/ping-continuous',
        { ip },
        { responseType: 'text' }
      );
    }
  }

  // ping(ip: string): Observable<string> {
  //   return this.http.post(
  //     'http://localhost:3000/ping-once',
  //     { ip },
  //     { responseType: 'text' }
  //   );
  // }

  // pingOnce(host: string): Observable<any> {
  //   return this.http.post('http://localhost:3000/ping-once', { host });
  // }
  // pingOnce(host: string): Observable<any> {
  //   return this.http.post('https://networksolutiontoolserver.onrender.com/ping-once', { host })
  //     .pipe(
  //       catchError(err => {
  //         console.error('Ping API error:', err);
  //         return throwError(() => new Error('Ping service is currently unavailable.'));
  //       })
  //     );
  // }
}
