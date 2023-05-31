import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { FlightService } from 'src/app/services/flight.service';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit{

  pilots: any[] = [];
  airplanes: any[]  = [];
  selectedPilot: any = {};
  selectedAirplane: any = {};

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

  formSubmit(){
    if( this.flight.fechaLlegada == '' || this.flight.fechaLlegada == '' || this.flight.lugarDestino == '' || this.flight.lugarOrigen == ''){
      this.snack.open("Debes ingresar todos los campos", "Cerrar", {
        duration: 3000,
      });

      return;
    }

    const selectedFlight = {
      lugarOrigen: this.flight.lugarOrigen,
      lugarDestino: this.flight.lugarDestino,
      fechaSalida: this.flight.fechaSalida,
      fechaLlegada: this.flight.fechaLlegada,
      avion: {
        avionId: this.selectedAirplane?.avionId || null,
      },
      piloto: {
        pilotoId: this.selectedPilot?.pilotoId || null,
      },
    };

    console.log(selectedFlight);

    this.flightService.addFlight(selectedFlight).subscribe(
      (dato: any) => {
        selectedFlight.lugarOrigen = '';
        selectedFlight.lugarDestino = '';
        selectedFlight.fechaSalida = '';
        selectedFlight.fechaLlegada = '';
        Swal.fire('Vuelo agregado', 'El vuelo ha sido agregado con éxito', 'success');
      this.router.navigate(['/admin/flights']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al guardar el vuelo', 'error');
      }
    )

    this.LimpiarObjetos();
  }

  LimpiarObjetos(){
    this.selectedPilot = {};    
    this.selectedAirplane = {};
    this.flight = {
      lugarOrigen: '',
      lugarDestino: '',
      fechaSalida: '',
      fechaLlegada: '',
    };
  }
}
