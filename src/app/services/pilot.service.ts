import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  constructor(private http: HttpClient) { }

  public listPilots(){
    return this.http.get(`${baserURL}/pilotos/`);
  }
  public listPilot(id:number){
    return this.http.get(`${baserURL}/pilotos/${id}`);
  }
  public addPilot(pilot:any){
    return this.http.post(`${baserURL}/pilotos/`,pilot);
  }
  public editPilot(pilot: any){
    return this.http.put(`${baserURL}/pilotos/`, pilot);
  }
  public deletePilot(id: number){
    return this.http.delete(`${baserURL}/pilotos/${id}`);
  }
}
