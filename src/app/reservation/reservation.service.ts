import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { find } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    let savedReservation = localStorage.getItem('reservations');
    this.reservations = savedReservation ? JSON.parse(savedReservation) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = String(this.reservations.length + 1);

    this.reservations.push(reservation);
    console.log(this.reservations);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    updatedReservation.id = String(this.reservations.length);
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
