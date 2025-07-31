import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortCheckerService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // 🔹 Check specific protocol: 'tcp' or 'udp'
  checkPort(ip: string, port: number, protocol: string): Observable<any> {
    const params = new HttpParams()
      .set('ip', ip)
      .set('port', port)
      .set('protocol', protocol);

    return this.http.get(`${this.baseUrl}/check-port`, { params });
  }

  // 🔹 Check both TCP and UDP in parallel
  checkPortBoth(ip: string, port: number): Observable<any> {
    const tcp$ = this.checkPort(ip, port, 'tcp');
    const udp$ = this.checkPort(ip, port, 'udp');
    return forkJoin([tcp$, udp$]); // returns both responses as an array
  }

















  // private apiUrl = 'https://networksolutiontoolserver.onrender.com/';

  // constructor(private http: HttpClient) {}

  // checkPort(ip: string, port: number): Observable<any> {
  //   const params = new HttpParams().set('ip', ip).set('port', port.toString());

  //   return this.http.get<any>(this.apiUrl + 'check-port', { params });
  // }
}
