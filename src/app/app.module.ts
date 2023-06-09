import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select'



import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    AirplaneComponent,
    AddAirplaneComponent,
    UpdateAirplaneComponent,
    PilotComponent,
    AddPilotComponent,
    UpdatePilotComponent,
    FlightComponent,
    AddFlightComponent,
    UpdateFlightComponent,
    ReservationComponent,
    SeeReservationComponent,
    AddReservationComponent,    
    PassengerComponent, 
    AddPassengerComponent, 
    UpdatePassengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
