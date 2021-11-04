import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageService;
  constructor() {
    this.localStorageService = localStorage;
   }

   setData(keyData:string, data:any){
     this.localStorageService.setItem(keyData, JSON.stringify(data));
   }

   getData(keyData: string){
    var data = this.localStorageService.getItem(keyData);
    return (data) ?  JSON.parse(data) : null;
   }

}
