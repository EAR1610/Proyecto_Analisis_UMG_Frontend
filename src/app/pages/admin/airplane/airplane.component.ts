import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrls: ['./airplane.component.css']
})

export class AirplaneComponent implements OnInit{

  airplanes: any[]  = [];
  displayedColumns: string[] = ['avionId', 'marca', 'modelo', 'capacidad', 'fabricante', 'anioFabricacion', 'activo', 'acciones'];

  constructor(private airplaneService:AirplaneService, private router:Router) {}

  ngOnInit() : void {
    this.cargarAviones();
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

  editarAvion(avionId:number){
    this.airplaneService.listAirplane(avionId).subscribe((avion:any) => {
      this.router.navigate(['/admin/update-airplane'], { state: { avion} });
    })
  }

  eliminarAvion(avionId: number): void {
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
          'El avion ha sido eliminado correctamente',
          'success'
        )
        this.airplaneService.deleteAirplane(avionId).subscribe(
          () => {
            this.cargarAviones();
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