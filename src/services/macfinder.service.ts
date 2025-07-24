import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MacfinderService {
 constructor(private http: HttpClient) {}
  // lookup(mac: string) {
  //   return this.http.get<{ vendor: string }>(
  //     'http://localhost:3000/mac-vendor',
  //     {
  //       params: { mac },
  //     }
  //   );
  // }
  lookup(mac: string): Observable<any> {
  const params = new HttpParams().set('mac', mac);
  return this.http.get('https://networksolutiontoolserver.onrender.com/mac-vendor', { params });
}
}
