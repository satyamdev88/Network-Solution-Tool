import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortCheckerService {
  private apiUrl = 'https://networksolutiontoolserver.onrender.com/';


  constructor(private http: HttpClient) {}
  
  checkPort(ip: string, port: number): Observable<any> {
  const params = new HttpParams()
    .set('ip', ip)
    .set('port', port.toString());

  return this.http.get<any>(this.apiUrl + 'check-port', { params });
}

}
