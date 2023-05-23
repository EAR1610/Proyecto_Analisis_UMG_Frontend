import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit{

  flights: any[] = [];
  displayedColumns: string[] = ['vueloId', 'piloto', 'marca','capacidad', 'lugarOrigen', 'lugarDestino', 'fechaSalida', 'fechaLlegada', 'acciones'];

  constructor(private flightService: FlightService, private router:Router) {}

  ngOnInit(): void {
    this.cargarVuelos();
  }

  cargarVuelos(){
    this.flightService.listFlights().subscribe(
      (dato: any) => {
        console.log(dato);
        this.flights = dato.map((flight: any) => {
          const { nombre, apellido } = flight.piloto;
          const { capacidad, marca } = flight.avion;
          
          return {
            ...flight,
            piloto: `${nombre} ${apellido}`,
            capacidad,
            marca
          };
        });
        console.log(this.flights);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!", "Error al cargar los vuelos", "error");
      }
    )    
  }


  editarVuelo(vueloId: number){
    this.flightService.listFlight(vueloId).subscribe(
      (vuelo: any) => {
        this.router.navigate(['/admin/update-flight'], {state: { vuelo }});
      }
    )
  }

  eliminarVuelo(vueloId: number){
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
          'El vuelo ha sido eliminado correctamente',
          'success'
        )
        this.flightService.deleteFlight(vueloId).subscribe(
          () => {
            this.cargarVuelos();
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

}
