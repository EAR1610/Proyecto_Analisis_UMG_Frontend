import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public listReservations(){
    return this.http.get(`${baserURL}/reservas/`);
  }
  public listReservation(id: number){
    return this.http.get(`${baserURL}/reservas/${id}`);
  }
  public addReservation(reservation: any){
    return this.http.post(`${baserURL}/reservas/`, reservation);
  }
  public editReservation(reservation: any){
    return this.http.put(`${baserURL}/reservas/`, reservation);
  }
  public deleteReservation(id: number){
    return this.http.delete(`${baserURL}/reservas/${id}`);
  }
}
