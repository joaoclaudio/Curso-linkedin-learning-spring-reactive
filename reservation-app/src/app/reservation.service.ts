import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:8080';
  private reservationUrl: string = this.baseUrl + '/room/v1/reservation/';

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationUrl);
  }

  createReservation(body: ReservationRequest): Observable<Reservation> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    console.log(body);
    return this.http.post<Reservation>(this.reservationUrl, body, httpOptions);
  }

}

export class ReservationRequest {

  roomNumber: number;
  checkin: string;
  checkout: string;
  price: number;

  constructor(  roomNumber: number, checkin: string, checkout: string, price: number){
    this.roomNumber = roomNumber;
    this.checkin = checkin;
    this.checkout = checkout;
    this.price = price;
  }
}

export interface Reservation {
  id: string;
  roomNumber: number;
  checkin: Date;
  checkout: Date;
  price: number;
}
