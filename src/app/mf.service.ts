import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfService {
mfUrl: string = "https://mfmicroserve.herokuapp.com/mutualfunds/"
  constructor(private http:HttpClient) { }
    
    getMFs(): Observable<any> {
      return this.http.get(this.mfUrl);
    } 
   getMF(id:number): Observable<any>{
     return this.http.get(this.mfUrl+id)
   }
    addMF(body: {}): Observable<any> {
      return this.http.post(this.mfUrl, body)
    }
    editMF(id:number, body:{}): Observable<any>{
      return this.http.put(this.mfUrl+id,body)
    }

    deleteMF(id: number): Observable<any>{
      return this.http.delete(this.mfUrl+id);
    }

}
