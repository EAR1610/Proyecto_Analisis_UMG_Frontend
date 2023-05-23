import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { FlightService } from 'src/app/services/flight.service';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit{


  pilots: any[] = [];
  airplanes: any[]  = [];
  flight: any = {};
  selectedPilot: any = {};
  selectedAirplane: any = {};
  flightForm: FormGroup;

  constructor(
    private flightService:FlightService,
    private pilotService:PilotService,
    private airplaneService:AirplaneService,
    private fb:FormBuilder,
    private router:Router
  ) {
    this.flightForm = this.fb.group({
      id: ['', Validators.required],
      lugarOrigen: ['', Validators.required],
      lugarDestino: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.cargarPilotos();
    this.cargarAviones();
    const flight = history.state.vuelo;
    console.log(history.state);
    this.flight = flight;
    console.log(this.flight);
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

  onSubmit(){
    const { vueloId } = this.flight;
    const formData = this.flightForm.value;
    const updatedFlight = {
      vueloId,
      lugarOrigen: formData.lugarOrigen,
      lugarDestino: formData.lugarDestino,
      fechaSalida: formData.fechaSalida,
      fechaLlegada: formData.fechaLlegada,
      avion: {
        avionId: this.selectedAirplane?.avionId || null,
      },
      piloto: {
        pilotoId: this.selectedPilot?.pilotoId || null,
      }
    };
    console.log(updatedFlight);    
    
    this.flightService.editFlight(updatedFlight).subscribe( res => {
      this.router.navigate(['/admin/flights']);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El vuelo ha sido editado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
