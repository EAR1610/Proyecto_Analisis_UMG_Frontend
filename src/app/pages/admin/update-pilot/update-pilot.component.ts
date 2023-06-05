import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PilotService } from 'src/app/services/pilot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-pilot',
  templateUrl: './update-pilot.component.html',
  styleUrls: ['./update-pilot.component.css']
})
export class UpdatePilotComponent implements OnInit{

  pilot : any = {};
  pilotForm: FormGroup;

  constructor(
    private pilotService : PilotService,
    private fb: FormBuilder,
    private router: Router,
    private snack:MatSnackBar,
  ) {
    this.pilotForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      horasVuelo: ['', Validators.required],
      fechaContratacion: ['', Validators.required],
      fechaVencimientoLicencia: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const piloto = history.state.piloto;
    console.log(history.state);
    this.pilot = piloto;
    console.log(this.pilot);
  }

  onSubmit(){
    const { pilotoId } = this.pilot;
    const formData = this.pilotForm.value;
    const updatedPilot = {
      pilotoId: pilotoId,
      nombre: formData.nombre,
      apellido: formData.apellido,
      fechaNacimiento: formData.fechaNacimiento,
      nacionalidad: formData.nacionalidad,
      horasVuelo: formData.horasVuelo,
      fechaContratacion: formData.fechaContratacion,
      fechaVencimientoLicencia: formData.fechaVencimientoLicencia,
    };

    if(updatedPilot.nombre == '' || updatedPilot.apellido == '' || updatedPilot.fechaNacimiento == '' || updatedPilot.nacionalidad == '' || updatedPilot.horasVuelo == '' || updatedPilot.fechaContratacion == '' || updatedPilot.fechaVencimientoLicencia == ''){
      this.snack.open('Debes completar todos los campos', 'Cerrar', {
        duration: 3000
      })

      return;
    }

    this.pilotService.editPilot(updatedPilot).subscribe( res => {
      this.router.navigate(['/admin/pilots']);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El piloto ha sido editado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
