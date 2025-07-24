import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TraceRouteService {

  // private apiUrl = 'https://networksolutiontoolserver.onrender.com/';
  // constructor(private http: HttpClient) {}

  // runTraceroute(ip: string): Observable<string> {
  //   return this.http.get(`http://localhost:3000/traceroute/${ip}`, { responseType: 'text' });
  // }
  constructor(private http: HttpClient) {}

runTraceroute(ip: string): Observable<string> {
  return this.http.get(`https://networksolutiontoolserver.onrender.com/traceroute/${ip}`, {
    responseType: 'text'
  });
}

}
