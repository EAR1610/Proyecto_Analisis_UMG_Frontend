import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { FlightService } from 'src/app/services/flight.service';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit{

  pilots: any[] = [];
  airplanes: any[]  = [];
  flights: any[] = [];
  selectedPilot: any = {};
  selectedAirplane: any = {};
  selectedFlight: any = {};

  reservation = {
    fechaReserva: '',
    numeroAsiento: '',
    horaEmbarque: '',
    puertaEmbarque: '',
    numeroMochila: '',
    pesoMochila: '',
  }

  flight = {
    lugarOrigen : '',
    lugarDestino : '',
    fechaSalida : '',
    fechaLlegada : '',    
  }

  constructor(
    private flightService:FlightService, 
    private pilotService:PilotService,
    private airplaneService:AirplaneService,
    private snack:MatSnackBar, 
    private router: Router) {}

  ngOnInit(): void {
    this.cargarPilotos();
    this.cargarAviones();
    this.cargarVuelos();
  }

  cargarPilotos(){
    this.pilotService.listPilots().subscribe(
      (dato:any) => {
        this.pilots = dato;
        console.log(this.pilots);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al carglos los pilotos", "error");
      }
    )
  }

  cargarAviones(){
    this.airplaneService.listAirplanes().subscribe(
      (dato:any) => {
        this.airplanes = dato;
        console.log(this.airplanes);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al cargar los aviones", "error");
      }
    )
  }

  cargarVuelos(){
    this.flightService.listFlights().subscribe(
      (dato:any) => {
        this.flights = dato;
        console.log(this.flights);
      },
      (error) =>{
        console.log(error);
        Swal.fire("Error!", "Error al cargar los vuelos", "error");
      }
    )
  }

  onIdentificationSelect(event: any){
    const selectedFlight = event.value;
    console.log(selectedFlight);

    this.flight.lugarOrigen = selectedFlight.lugarOrigen;
    this.flight.lugarDestino = selectedFlight.lugarDestino;
    this.flight.fechaSalida = selectedFlight.fechaSalida;
    this.flight.fechaLlegada = selectedFlight.lugarOrigen;
  }

  formSubmit(){
    if(this.reservation.fechaReserva == '' || this.reservation.horaEmbarque == '' || this.reservation.numeroAsiento == '' || this.reservation.numeroMochila == '' || this.reservation.pesoMochila == '' || this.reservation.puertaEmbarque == ''){
      this.snack.open("Debes ingresar todos los campos", "Cerrar", {
        duration: 3000,
      });

      return;
    }



  }

}
