import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit{

  pilots: any[] = [];
  displayedColumns: string[] = ['pilotoId', 'nombre', 'apellido', 'fechaNacimiento', 'nacionalidad', 'horasVuelo', 'fechaContratacion', 'fechaVencimientoLicencia', 'acciones'];

  constructor(private pilotService: PilotService, private router:Router){}
  ngOnInit(): void {
    this.cargarPilotos();
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

  editarPiloto(pilotoId: number){
    this.pilotService.listPilot(pilotoId).subscribe((piloto:any)=>{
        this.router.navigate(['/admin/update-pilot'], { state: { piloto } });
        console.log(piloto);
      }
    )
  }

  eliminarPiloto(pilotoId: number){
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
          'El piloto ha sido eliminado correctamente',
          'success'
        )
        this.pilotService.deletePilot(pilotoId).subscribe(
          () => {
            this.cargarPilotos();
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
