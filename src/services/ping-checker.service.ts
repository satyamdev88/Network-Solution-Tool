import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingCheckerService {
  constructor(private http: HttpClient) {}
  ping(ip: string) {
    return this.http.post(
      'http://localhost:3000/ping-once',
      { ip },
      { responseType: 'text' }
    );
  }
}
