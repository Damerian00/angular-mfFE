import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarsenderService {
  public importedStocks:any
  public importedCDs:any
  constructor() { }
}
