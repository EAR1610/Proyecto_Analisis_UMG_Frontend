import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PilotService } from 'src/app/services/pilot.service';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-reservation',
  templateUrl: './see-reservation.component.html',
  styleUrls: ['./see-reservation.component.css']
})
export class SeeReservationComponent implements OnInit {

  pilots: any[] = [];
  reservation: any = {};
  reservationForm: FormGroup;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      id: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      nombreClase: ['', Validators.required],
      precioClase: ['', Validators.required],
      numeroAsiento: ['', Validators.required],
      numeroEmbarque: ['', Validators.required],
      puertaEmbarque: ['', Validators.required],
      numeroMochila: ['', Validators.required],
      pesoMochila: ['', Validators.required],
      lugarOrigen: ['', Validators.required],
      lugarDestino: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      pasajero: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      piloto: ['', Validators.required],
      username: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    const reservation = history.state.reservacion;
    const { nombre, apellido, nacionalidad } = reservation.pasajero;
    const { fechaSalida, fechaLlegada, lugarOrigen, lugarDestino, piloto : { nombre: nombrePiloto } } = reservation.vuelo;
    const { username } = reservation.usuario;

    this.reservation = {
      ...reservation,
      pasajero: `${nombre} ${apellido}`,
      nacionalidad,
      fechaSalida,
      fechaLlegada,
      lugarOrigen,
      lugarDestino,
      username,
    };
    console.log(this.reservation);
  }
}
