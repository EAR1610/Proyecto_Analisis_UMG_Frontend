import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  constructor(private http: HttpClient) { }

  public listAirplanes(){
    return this.http.get(`${baserURL}/aviones/`);
  }
  public listAirplane(id:number){
    return this.http.get(`${baserURL}/aviones/${id}`);
  }
  public addAirplane(airplane: any){
    return this.http.post(`${baserURL}/aviones/`, airplane);
  }
  public editAirplane(airplane: any){
    return this.http.put(`${baserURL}/aviones/`, airplane);
  }
  public deleteAirplane(id:number){
    return this.http.delete(`${baserURL}/aviones/${id}`);
  }
}
