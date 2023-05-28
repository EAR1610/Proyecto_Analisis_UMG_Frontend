import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { OperadorGuard } from './services/operador.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AirplaneComponent } from './pages/admin/airplane/airplane.component';
import { AddAirplaneComponent } from './pages/admin/add-airplane/add-airplane.component';
import { UpdateAirplaneComponent } from './pages/admin/update-airplane/update-airplane.component';
import { PilotComponent } from './pages/admin/pilot/pilot.component';
import { AddPilotComponent } from './pages/admin/add-pilot/add-pilot.component';
import { UpdatePilotComponent } from './pages/admin/update-pilot/update-pilot.component';
import { FlightComponent } from './pages/admin/flight/flight.component';
import { AddFlightComponent } from './pages/admin/add-flight/add-flight.component';
import { UpdateFlightComponent } from './pages/admin/update-flight/update-flight.component';
import { ReservationComponent } from './pages/admin/reservation/reservation.component';
import { SeeReservationComponent } from './pages/admin/see-reservation/see-reservation.component';
import { AddReservationComponent } from './pages/admin/add-reservation/add-reservation.component';
import { PassengerComponent } from './pages/admin/passenger/passenger.component';
import { AddPassengerComponent } from './pages/admin/add-passenger/add-passenger.component';
import { UpdatePassengerComponent } from './pages/admin/update-passenger/update-passenger.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,   
    canActivate:[AdminGuard],
    children:[
      { 
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'airplanes',
        component: AirplaneComponent,        
      },
      {
        path: 'add-airplane',
        component: AddAirplaneComponent
      },
      {
        path: 'update-airplane',
        component: UpdateAirplaneComponent
      },
      {
        path: 'pilots',
        component: PilotComponent,
      } ,
      {
        path: 'add-pilot',
        component: AddPilotComponent,
      },
      {
        path: 'update-pilot',
        component: UpdatePilotComponent,
      },
      {
        path: 'flights',
        component: FlightComponent,
      },
      {
        path: 'add-flight',
        component: AddFlightComponent,
      },
      {
        path: 'update-flight',
        component: UpdateFlightComponent,
      },
      {
        path: 'reservations',
        component: ReservationComponent,
      },
      {
        path: 'see-reservation',
        component: SeeReservationComponent,
      },
      {
        path: 'add-reservation',
        component: AddReservationComponent,
      },
      {
        path: 'passengers',
        component: PassengerComponent,
      },
      {
        path: 'add-passenger',
        component: AddPassengerComponent,
      },
      {
        path: 'update-passenger',
        component: UpdatePassengerComponent,
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate:[OperadorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
