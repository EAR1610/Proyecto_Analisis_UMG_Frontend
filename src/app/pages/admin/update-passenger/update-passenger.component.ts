import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-passenger',
  templateUrl: './update-passenger.component.html',
  styleUrls: ['./update-passenger.component.css']
})
export class UpdatePassengerComponent implements OnInit{

  pasajero: any = {};
  passengerForm: FormGroup;

  constructor(
    private passengerService: PassengerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passengerForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],      
      numeroIdentificacion: ['', Validators.required],      
      titulo: ['', Validators.required],      
    })
  }
  ngOnInit(): void {
    const pasajero = history.state.pasajero;
    this.pasajero = pasajero;
    console.log(this.pasajero);
  }

  @ViewChild('numberIdentification') numberIdentification!: ElementRef<HTMLInputElement>;

  onIdentificationSelect(event: any){
    const selectedIdentification = event.value; 

    if(selectedIdentification == 'DPI'){
      this.numberIdentification.nativeElement.setAttribute('maxlength', '13');
      this.numberIdentification.nativeElement.setAttribute('pattern', '^[0-9]{13}$');
      
    } else {
      this.numberIdentification.nativeElement.setAttribute('maxlength', '9');
      this.numberIdentification.nativeElement.setAttribute('pattern', '/^[A-Z]{3}[0-9]{6}$/');

    }
    
  }

  onSubmit(){
    const { pasajeroId } = this.pasajero;
    const formData = this.passengerForm.value;
    const updatePassenger = {
      pasajeroId: pasajeroId,
      nombre: formData.nombre,
      apellido: formData.apellido,
      fechaNacimiento: formData.fechaNacimiento,
      nacionalidad: formData.nacionalidad,
      tipoIdentificacion: formData.tipoIdentificacion,
      numeroIdentificacion: formData.numeroIdentificacion,
      titulo: formData.titulo,
    };
    this.passengerService.editPassenger(updatePassenger).subscribe( res => {
      this.router.navigate(['/admin/passengers']);
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El pasajero ha sido editado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
