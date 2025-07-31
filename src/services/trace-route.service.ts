import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraceRouteService {
  constructor(private http: HttpClient) {}

  runTracerouteStream(ip: string): EventSource {
    return new EventSource(`http://localhost:3000/traceroute-stream?ip=${ip}`);
  }
}
