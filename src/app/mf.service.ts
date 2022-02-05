import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfService {
mfUrl: string = "https://mfmicroserve.herokuapp.com/mutualfunds"
  constructor(private http:HttpClient) { }
    
    getMFs(): Observable<any> {
      return this.http.get(this.mfUrl);
    } 
   
    addMF(body: {}): Observable<any> {
      return this.http.post(this.mfUrl, body)
    }

}
