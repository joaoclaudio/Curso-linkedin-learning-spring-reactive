import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation, ReservationRequest, ReservationService } from './reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reservation-app';

  constructor(private reservationService: ReservationService) { }

  rooms: Room[];
  roomSearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  ngOnInit(): void {

    this.roomSearchForm = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl(''),
      roomNumber: new FormControl('')
    });

    this.roomSearchForm.valueChanges.subscribe(form => {
      console.log(form.checkin);
      this.currentCheckInVal = form.checkin;
      console.log(form.checkout);
      this.currentCheckOutVal = form.checkout;

      console.log(form.roomNumber);
      if (form.roomNumber) {
        const roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }
    });

    this.rooms = [
      new Room('127', '127', '150'),
      new Room('138', '138', '180'),
      new Room('254', '254', '200')
    ];

    this.getCurrentReservations();
  }

  getCurrentReservations(): void {
    this.reservationService.getReservations()
      .subscribe(getResult => {
        console.log(getResult);
        this.currentReservations = getResult;
      });
  }

  createReservation(): void {
    this.reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentCheckInVal,
        this.currentCheckOutVal, this.currentPrice)
    ).subscribe(postResult => {
      console.log(postResult);
      this.getCurrentReservations();
    });
  }

}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }

}

