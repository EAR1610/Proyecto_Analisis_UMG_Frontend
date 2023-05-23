import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  public listFlights(){
    return this.http.get(`${baserURL}/vuelos/`);
  }
  public listFlight(id:number){
    return this.http.get(`${baserURL}/vuelos/${id}`);
  }
  public addFlight(flight: any){
    return this.http.post(`${baserURL}/vuelos/`, flight);
  }
  public editFlight(flight: any){
    return this.http.put(`${baserURL}/vuelos/`, flight);
  }
  public deleteFlight(id: number){
    return this.http.delete(`${baserURL}/vuelos/${id}`);
  }
}
