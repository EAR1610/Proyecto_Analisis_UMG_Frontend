import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { jsPDF } from 'jspdf';
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
    this.reservationService.listReservation(reservaId).subscribe((reservacion: any) => {      
      const {
        pasajero: { titulo, nombre, fechaNacimiento, nacionalidad },
        nombreClase,
        precioClase,
        numeroAsiento,
        numeroEmbarque,
        vuelo: { lugarOrigen, lugarDestino, fechaSalida, fechaLlegada }
      } = reservacion;
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text(`      TagAirlines!`, 10, 10);
      doc.setFontSize(12);
      doc.text(`${titulo}: ${nombre}`, 10, 15);
      doc.text(`${fechaNacimiento} ${nacionalidad}`, 10, 20);
      doc.text(`Nombre Clase: ${nombreClase}`, 10, 25);
      doc.text(`Precion Clase: ${precioClase}`, 10, 30);
      doc.text(`Número de Asiento: ${numeroAsiento}`, 10, 35);
      doc.text(`numeroEmbarque: ${numeroEmbarque}`, 10, 40);
      doc.text(`Lugar de Origen: ${lugarOrigen}`, 10, 45);
      doc.text(`Lugar de destino: ${lugarDestino}`, 10, 50);
      doc.text(`Fecha de Salida: ${fechaSalida}`, 10, 55);
      doc.text(`Fecha de Llegada: ${fechaLlegada}`, 10, 60);

      doc.save("reservacion.pdf");
    })
  }
}

