import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http:HttpClient) { }

  public listPassengers(){
    return this.http.get(`${baserURL}/pasajeros/`);    
  }
  public listPassanger(id: number){
    return this.http.get(`${baserURL}/pasajeros/${id}`);
  }
  public addPassenger(passenger: any){
    return this.http.post(`${baserURL}/pasajeros/`, passenger);
  }
  public editPassenger(passenger: any){
    return this.http.put(`${baserURL}/pasajeros/`, passenger);
  }
  public deletePassenger(id: number){
    return this.http.delete(`${baserURL}/pasajeros/${id}`);
  }
}
