import { Component, OnInit } from '@angular/core';
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

  getYearFromDate(date:Date): number{
    return date.getFullYear();
  }

  airplane = {
    marca : '',
    modelo : '',
    capacidad : '',
    fabricante : '',
    anioFabricacion :'',
  }

  constructor(private airplaneService:AirplaneService, private snack:MatSnackBar, private router:Router){}

  ngOnInit(): void{

  }

  formSubmit(){
    if(this.airplane.marca.trim() == '' || this.airplane.modelo == '' || this.airplane.capacidad == '' || this.airplane.fabricante == '' || this.airplane.anioFabricacion == null){
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
        Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
        this.router.navigate(['/admin/airplanes']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar el avión','error')
      }
    )
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.value);
    const year = selectedDate.getFullYear();
    const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ("0" + selectedDate.getDate()).slice(-2);
    this.airplane.anioFabricacion = year + '-' + month + '-' + day;
  }

}
