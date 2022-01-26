import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { Store } from './store.model';
import { Observable, Subject } from 'rxjs';
import  Stores from '../../assets/Stores.json';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private stores: Store[] = Stores;
  private nearStores: Subject<Store[]> = new Subject<Store[]>();
  private radius = 0.5;

  constructor() { }

  loadStores(): Observable<Store[]> {
    return this.nearStores.asObservable();
  }

  getNearby(position: LatLng): void {
    if (!this.stores) {
      this.nearStores.next([]);
      return;
    }
    this.nearStores.next(
      this.stores.filter((store: Store) => {
        return this.isNearBy(store, position);
      })
    );
  }

  isNearBy(store: Store, position: LatLng): boolean {
    const minLat = position.lat - this.radius;
    const maxLat = position.lat + this.radius;
    const minLng = position.lng - this.radius;
    const maxLng = position.lng + this.radius;
    let okLat = false;
    let okLng = false;
    if (store.lat > minLat && store.lat < maxLat) {
      okLat = true;
    }
    if (store.long > minLng && store.long < maxLng) {
      okLng = true;
    }
    return okLat && okLng;
  }

}
