import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pilot',
  templateUrl: './add-pilot.component.html',
  styleUrls: ['./add-pilot.component.css']
})
export class AddPilotComponent implements OnInit{

  pilot = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    nacionalidad: '',
    horasVuelo: '',
    fechaContratacion: '',
    fechaVencimientoLicencia: '',
  }

  constructor(private pilotService: PilotService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {

  }

  formSubmit(){
    if(this.pilot.nombre == '' || this.pilot.apellido == '' || this.pilot.fechaNacimiento == '' || this.pilot.nacionalidad == '' || this.pilot.horasVuelo == '' || this.pilot.fechaContratacion == '', this.pilot.fechaVencimientoLicencia == ''){
      this.snack.open('Debes completar todos los campos', 'Cerrar', {
        duration: 3000
    })

    return;
  }

  this.pilotService.addPilot(this.pilot).subscribe(
    (dato:any) => {
      this.pilot.nombre = '';
      this.pilot.apellido = '';
      this.pilot.fechaNacimiento = '';
      this.pilot.nacionalidad = '';
      this.pilot.horasVuelo = '';
      this.pilot.fechaContratacion = '';
      this.pilot.fechaVencimientoLicencia = '';
      Swal.fire('Piloto agregado', 'El piloto ha sido agregado con éxito', 'success');
      this.router.navigate(['/admin/pilots']);
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error al guardar el piloto', 'error');
    }
  )
  }
}
