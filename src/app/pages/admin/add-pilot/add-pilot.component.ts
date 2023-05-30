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
    fechaNacimiento: null,
    nacionalidad: '',
    horasVuelo: '',
    fechaContratacion: null,
    fechaVencimientoLicencia: null,
  }

  constructor(private pilotService: PilotService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void {

  }

  validateHorasVuelo(event: any) {
    const inputValue = event.target.value;
    const isNumber = /^\d+$/.test(inputValue);

    if (!isNumber) {
      event.target.value = this.pilot.horasVuelo;
      this.snack.open("Por favor, ingresar solamente números!",'',{
        duration:3000
      })
    } else {
      this.pilot.horasVuelo = inputValue;
    }
  }

  formSubmit(){
    if(this.pilot.nombre == '' || this.pilot.apellido == '' || this.pilot.fechaNacimiento == null || this.pilot.nacionalidad == '' || this.pilot.horasVuelo == '' || this.pilot.fechaContratacion == null, this.pilot.fechaVencimientoLicencia == null){
      this.snack.open('Debes completar todos los campos', 'Cerrar', {
        duration: 3000
    })

    return;
  }

  this.pilotService.addPilot(this.pilot).subscribe(
    (dato:any) => {
      this.pilot.nombre = '';
      this.pilot.apellido = '';
      this.pilot.fechaNacimiento = null;
      this.pilot.nacionalidad = '';
      this.pilot.horasVuelo = '';
      this.pilot.fechaContratacion = null;
      this.pilot.fechaVencimientoLicencia = null;
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
