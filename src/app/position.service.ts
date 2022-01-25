import { Injectable } from '@angular/core';
import { latLng, LatLng } from 'leaflet';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private currentPosition: Subject<LatLng> = new Subject<LatLng>();

  constructor() { }

  set(position: LatLng) {
    this.currentPosition.next(position);
  }

  listen(): Observable<LatLng> {
    return this.currentPosition.asObservable();
  }

  geolocate() {
    if (!navigator.geolocation) {
      this.currentPosition.next(latLng(43.4254835, 11.7966376));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.currentPosition.next(latLng(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        this.currentPosition.next(latLng(43.4254835, 11.7966376));
      });

  }
}
