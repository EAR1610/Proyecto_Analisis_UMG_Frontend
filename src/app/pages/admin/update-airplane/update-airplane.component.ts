import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AirplaneService } from 'src/app/services/airplane.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-airplane',
  templateUrl: './update-airplane.component.html',
  styleUrls: ['./update-airplane.component.css']
})
export class UpdateAirplaneComponent implements OnInit{

  airplane : any = {};
  avionForm: FormGroup;

  constructor(
      private airplaneService:AirplaneService,
      private route:ActivatedRoute,
      private fb: FormBuilder,
      private router:Router,
      private snack:MatSnackBar,      
    ) {    
      this.avionForm = this.fb.group({
        id: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        capacidad: ['', Validators.required],
        fabricante: ['', Validators.required],
        anioFabricacion: ['', Validators.required],
        activo: ['', Validators.required],
      }); 
    }

    ngOnInit() {
      console.log(history.state);
      const avion = history.state.avion;
      this.airplane = avion;
    }

    onSubmit(){
      const { avionId } = this.airplane;
      const formData = this.avionForm.value;
      const updatedAirplane = {
        avionId: avionId,
        marca: formData.marca,
        modelo: formData.modelo,
        capacidad: formData.capacidad,
        fabricante: formData.fabricante,
        anioFabricacion: formData.anioFabricacion
      };

      if(updatedAirplane.marca == '' || updatedAirplane.modelo == '' || updatedAirplane.capacidad == '' || updatedAirplane.fabricante == '' || updatedAirplane.anioFabricacion == ''){
        this.snack.open('Debes completar todos los campos', 'Cerrar', {
          duration: 3000
        })
  
        return;
      }

      this.airplaneService.editAirplane(updatedAirplane).subscribe(res => {
        this.router.navigate(['/admin/airplanes']);
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El avión ha sido editado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }  
}
