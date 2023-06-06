import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  reservations: any[] = [];
  displayedColumns: string[] = ['reservaId', 'pasajero', 'piloto', 'fechaReserva', 'acciones'];

  constructor(private reservationService: ReservationService, private router:Router) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(){
    this.reservationService.listReservations().subscribe(
      (dato: any) => {
        console.log(dato);
        this.reservations = dato.map((reservation: any) => {
          const { nombre, apellido, nacionalidad } = reservation.pasajero;
          const { fechaSalida, fechaLlegada, piloto : { nombre: nombrePiloto } } = reservation.vuelo;
          //const { username } = reservation.usuario;

          return {
            ...reservation,
            pasajero: `${nombre} ${apellido}`,
            fechaSalida,
            fechaLlegada,
            //username,
            piloto: `${nombrePiloto}`
          };
        });
        console.log(this.reservations);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al cargar los vuelos", "error");
      }
    )
  }

  verReservacion(reservaId: number){
    this.reservationService.listReservation(reservaId).subscribe((reservacion: any) => {
      this.router.navigate(['/admin/see-reservation'], {state: {reservacion}});
    })
  }

  eliminarReservacion(reservaId: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "Ya no podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La reservación ha sido eliminada correctamente',
          'success'
        )
        this.reservationService.deleteReservation(reservaId).subscribe(
          () => {
            this.cargarReservas();
          },
          (error) => {
            console.log(error);
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La operación ha sido cancelada',
          'error'
        )
      }
    })
  }

  descargarReservacion(reservaId:number){
    
  }
}

