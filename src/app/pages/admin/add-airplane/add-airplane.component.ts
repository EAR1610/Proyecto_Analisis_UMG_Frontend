import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AirplaneService } from 'src/app/services/airplane.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-airplane',
  templateUrl: './add-airplane.component.html',
  styleUrls: ['./add-airplane.component.css']
})
export class AddAirplaneComponent implements OnInit{

  airplane = {
    marca : '',
    modelo : '',
    capacidad : '',
    fabricante : '',
    anioFabricacion :'',
  }

  isNumberInput = "/[0-9]|\./";

  constructor(private airplaneService:AirplaneService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void{

  }

  validateCapacidad(event: any) {
    const inputValue = event.target.value;
    const isNumber = /^\d+$/.test(inputValue);

    if (!isNumber) {
      event.target.value = this.airplane.capacidad;
      this.snack.open("Por favor, ingresar solamente números!",'',{
        duration:3000
      })
    } else {
      this.airplane.capacidad = inputValue;
    }
  } 

  formSubmit(){
    if(this.airplane.marca.trim() == '' || this.airplane.modelo == '' || this.airplane.capacidad == '' || this.airplane.fabricante == '' || this.airplane.anioFabricacion == ''){
      this.snack.open("La información del avión es requerida!!",'',{
        duration:3000
      })
      
      return ;
    }

    this.airplaneService.addAirplane(this.airplane).subscribe(
      (dato:any) => {
        this.airplane.marca = '';
        this.airplane.modelo = '';
        this.airplane.capacidad = '';
        this.airplane.fabricante = '';
        this.airplane.anioFabricacion = '';
        Swal.fire('Avión agregado','El avión ha sido agregada con éxito','success');
        this.router.navigate(['/admin/airplanes']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar el avión','error')
      }
    )
  }
}
