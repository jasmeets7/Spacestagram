import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from './home/post';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private nasaDataListener = new Subject<Array<post>>();

  constructor(private http: HttpClient) { }

  getNasaData(){
    this.http.get<Array<post>>(environment.API_URL ?? '').pipe(map(data => {
      const modifiedArray: Array<post> = [];
      data.map((data) => {
        modifiedArray.push({...data, liked: false});
      });
      return modifiedArray;
    })).subscribe(data => this.nasaDataListener.next(data));
  }

  getData(){
    return this.nasaDataListener.asObservable();
  }

  getNasaDateData(date: string){
    this.http.get<post>((environment.API_DATE_URL ?? '')+date).pipe(map(data => {
      const modifiedArray: Array<post> = [];
      modifiedArray.push({...data, liked: false});
      return modifiedArray;
    })).subscribe(data => {
      this.nasaDataListener.next(data);
    });
  }
}