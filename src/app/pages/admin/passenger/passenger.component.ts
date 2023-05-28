import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit{

  passengers: any[] = [];
  displayedColumns: string[] = ['pasajeroId', 'nombre', 'apellido', 'fechaNacimiento', 'nacionalidad', 'tipoIdentificacion', 'numeroIdentificacion', 'titulo', 'acciones'];

  constructor(
    private passengerService: PassengerService,
    private router:Router
    ) {}

  ngOnInit(): void {
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

  editarPasajero(pasajeroId: number){
    this.passengerService.listPassanger(pasajeroId).subscribe((pasajero: any) => {
      this.router.navigate(['/admin/update-passenger'], { state: { pasajero }});
      console.log(pasajero);
    })
  }

  eliminarPasajero(pasajeroId: number){
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
          'El pasajero ha sido eliminado correctamente',
          'success'
        )
        this.passengerService.deletePassenger(pasajeroId).subscribe(
          () => {
            this.cargarPasajeros();
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
