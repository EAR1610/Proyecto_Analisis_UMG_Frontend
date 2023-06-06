import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import { FlightService } from 'src/app/services/flight.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { LoginService } from 'src/app/services/login.service';
import { PassengerService } from 'src/app/services/passenger.service';
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
  passengers: any[] = [];
  selectedPilot: any = {};
  selectedAirplane: any = {};
  selectedFlight: any = {};
  selectedPassenger: any = {};

  reservation = {
    fechaReserva: '',
    numeroAsiento: '',
    horaEmbarque: '',
    puertaEmbarque: '',
    numeroMochila: '',
    pesoMochila: '',
    clase: '',
    precioClase: '',
  }

  flight = {
    lugarOrigen : '',
    lugarDestino : '',
    fechaSalida : '',
    fechaLlegada : '',    
  }
  
  seatList: string[] | undefined;
  selectedSeat: string = '';


  constructor(
    private reservationService: ReservationService,
    private flightService:FlightService, 
    private pilotService:PilotService,
    private airplaneService:AirplaneService,
    private passengerService:PassengerService,
    private snack:MatSnackBar,
    private loginService:LoginService, 
    private router: Router) {}

  ngOnInit(): void {
    this.cargarPilotos();
    this.cargarAviones();
    this.cargarVuelos();
    this.cargarPasajeros();
  }


  cargarPasajeros(){
    this.passengerService.listPassengers().subscribe(
      (dato: any) => {
        this.passengers = dato;
        console.log(this.passengers);
      }, 
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al cargar los pasajeros", "error");
      }
    )
  }

  cargarPilotos(){
    this.pilotService.listPilots().subscribe(
      (dato:any) => {
        this.pilots = dato;
        console.log(this.pilots);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al cargar los los pilotos", "error");
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

    //Obtener la capacidad del avion
    const capacity = selectedFlight.avion.capacidad;

    // Generar la lista de asientos sin incluir el asiento previamente seleccionado
    this.generateSeatList(capacity, this.reservation.numeroAsiento);
  }

  generateSeatList(capacity: number, excludeSeat: string) {
    const seats = [];
    for (let i = 1; i <= capacity; i++) {
      const seat = `Asiento ${i}`;
      if (seat !== excludeSeat) {
        seats.push(seat);
      }
    }
    this.seatList = seats;
  }

  formSubmit(){
    console.log(this.loginService.getUser().id);
    if(this.reservation.fechaReserva == '' || this.reservation.horaEmbarque == '' || this.reservation.numeroAsiento == '' || this.reservation.numeroMochila == '' || this.reservation.clase == '' || this.reservation.pesoMochila == '' || this.reservation.puertaEmbarque == '' || this.reservation.precioClase == ''){
      this.snack.open("Debes ingresar todos los campos", "Cerrar", {
        duration: 3000,
      });

      return;
    }

    // Obtener la capacidad restante del avión seleccionado
    const selectedFlight = this.selectedFlight;
    const remainingCapacity = selectedFlight.avion.capacidad - 1; // Restamos 1 por la reserva actua

    // Almacenar la capacidad restante en localStorage
    localStorage.setItem('remainingCapacity', remainingCapacity.toString());

    // Restar la capacidad al vuelo seleccionado
    selectedFlight.avion.capacidad = remainingCapacity;

    const selectedReservation = {
      fechaReserva: this.reservation.fechaReserva,
      horaEmbarque: this.reservation.horaEmbarque,
      numeroAsiento: this.reservation.numeroAsiento,
      numeroMochila: this.reservation.numeroMochila,
      nombreClase: this.reservation.clase,
      precioClase: this.reservation.precioClase,
      puertaEmbarque: this.reservation.puertaEmbarque,
      pesoMochila: this.reservation.pesoMochila,
      pasajero: {
        pasajeroId: this.selectedPassenger?.pasajeroId || null,
      },
      vuelo: {
        vueloId: this.selectedFlight?.vueloId || null,
      },
      usuario: {
        id: this.loginService.getUser().id,
      }
        
    };
    
    console.log(selectedReservation);
    this.reservationService.addReservation(selectedReservation).subscribe(
      (dato: any) => {
        selectedReservation.fechaReserva == '';
        selectedReservation.horaEmbarque == '';
        selectedReservation.numeroAsiento == '';
        selectedReservation.numeroMochila == '';
        selectedReservation.nombreClase == '';
        selectedReservation.precioClase == '';
        selectedReservation.puertaEmbarque == '';
        selectedReservation.pesoMochila == '';
        Swal.fire('Reserva agregada', 'La reservación ha sido agregado con éxito', 'success');
      this.router.navigate(['/admin/reservations'])
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al guardar la reserva', 'error');
      }
    )
  }

}


/*{
  fechaReserva: new Date('2023-06-04T06:00:00.000Z'),
  horaEmbarque: '18:50 PM',
  numeroAsiento: 'Asiento 5',
  numeroMochila: '2',
  clase: 'Media',
  puertaEmbarque: 'Principal',
  pesoMochila: '3',
  pasajero: { pasajeroId: 1 },
  vuelo: { vueloId: 1 },
  usuario: {
    id: {
      id: 1,
      username: 'Phantom',
      password: '$2a$10$/JaAjWPmxPGrqgtJoNKO4.sZfsGZP9JqmOPVZeg4Ft.ROhdqRp1Jq',
      nombre: 'Edixon',
      apellido: 'Reynoso',
      email: 'phantom@coder.com',
      telefono: '33554285',
      enabled: true,
      perfil: 'foto.png',
      authorities: [ { authority: 'ADMIN' } ],
      accountNonExpired: true,
      credentialsNonExpired: true,
      accountNonLocked: true
    }
  }
}

#2
{
      reservaId: 1,
      fechaReserva: '06-05-2023',
      nombreClase: 'Primera Clase',
      precioClase: 450.5,
      numeroAsiento: 'P001',
      numeroEmbarque: 'E001',
      puertaEmbarque: null,
      numeroMochila: 3,
      pesoMochila: 71.65,
      pasajero: {
        pasajeroId: 1,
        nombre: 'Erich Alfred',
        apellido: 'Hartmann',
        fechaNacimiento: '19-04-1922',
        nacionalidad: 'aleman',
        tipoIdentificacion: 'AZHUC',
        numeroIdentificacion: 'C546sdweq2',
        titulo: 'Mr'
      },
      vuelo: {
        vueloId: 1,
        avion: {
          avionId: 1,
          marca: 'R-Dead',
          modelo: 'R-155',
          capacidad: 200,
          fabricante: 'Russian Group',
          anioFabricacion: '2023-05-07T06:00:00.000Z',
          activo: true
        },
        lugarOrigen: 'Guatemala',
        lugarDestino: 'Peten',
        fechaSalida: '2023-05-04',
        fechaLlegada: '2023-05-06T06:00:00.000Z',
        piloto: {
          pilotoId: 2,
          nombre: 'Elon',
          apellido: 'Musk',
          fechaNacimiento: '2023-05-09T06:00:00.000Z',
          nacionalidad: 'aleman',
          horasVuelo: '1500',
          fechaContratacion: '2023-05-22T06:00:00.000Z',
          fechaVencimientoLicencia: '2023-05-21T06:00:00.000Z'
        }
      },
      usuario: {
        id: 1,
        username: 'Phantom',
        password: '$2a$10$/JaAjWPmxPGrqgtJoNKO4.sZfsGZP9JqmOPVZeg4Ft.ROhdqRp1Jq',
        nombre: 'Edixon',
        apellido: 'Reynoso',
        email: 'phantom@coder.com',
        telefono: '33554285',
        enabled: true,
        perfil: 'foto.png',
        authorities: [ { authority: 'ADMIN' } ],
        accountNonExpired: true,
        credentialsNonExpired: true,
        accountNonLocked: true
      }
    }

*/