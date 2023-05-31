import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  passenger = {
    nombre: '',
    apellido: '',
    fechaNacimiento : '',
    nacionalidad: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    titulo: '',
  }

  constructor(
    private passengerService: PassengerService,
    private snack:MatSnackBar,
    private router: Router
    ) {}

  ngOnInit(): void {
    
  }

  @ViewChild('numberIdentification') numberIdentification!: ElementRef<HTMLInputElement>;

  validateNumI(event: any) {
    const inputValue = event.target.value;
    const isNumber = /^\d+$/.test(inputValue);
    
    if (!isNumber && this.passenger.tipoIdentificacion === 'DPI') {
      event.target.value = this.passenger.numeroIdentificacion;
      this.snack.open("Por favor, ingresar solamente números!",'',{
        duration:3000
      });      
      
    } else {
      this.passenger.numeroIdentificacion = inputValue;
    }
  }

  onIdentificationSelect(event: any){
    const selectedIdentification = event.value;
    
    this.passenger.numeroIdentificacion = '';

    if(selectedIdentification == 'DPI'){
      this.numberIdentification.nativeElement.setAttribute('maxlength', '13');
      this.numberIdentification.nativeElement.setAttribute('pattern', '^[0-9]{13}$');

    } else {
      this.numberIdentification.nativeElement.setAttribute('maxlength', '9');
      this.numberIdentification.nativeElement.setAttribute('pattern', '/^[A-Z]{3}[0-9]{6}$/');
    }
  }

  formSubmit(){
    if(this.passenger.nombre == '' || this.passenger.apellido == '' || this.passenger.fechaNacimiento == '' || this.passenger.nacionalidad == '' || this.passenger.tipoIdentificacion == '' || this.passenger.numeroIdentificacion == '' || this.passenger.titulo == ''){
      this.snack.open('Debes completar todos los campos', 'Cerrar', {
        duration: 3000
    })

    return;
  }

    this.passengerService.addPassenger(this.passenger).subscribe(
      (dato: any) => {
        this.passenger.nombre = '';
        this.passenger.apellido = '';
        this.passenger.fechaNacimiento = '';
        this.passenger.nacionalidad = '';
        this.passenger.tipoIdentificacion = '';
        this.passenger.numeroIdentificacion = '';
        this.passenger.titulo = '';
        Swal.fire('Pasajero agregado', 'El pasajero ha sido agregado con éxito', 'success');
        this.router.navigate(['/admin/passengers']);
      },
      (error) => {
        Swal.fire('Error !!', 'Error al guardar el pasajero', 'error');
      }
    )
  }
}
