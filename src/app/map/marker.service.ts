import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  private markers: L.Marker[] = [];
  private positionMarker: L.Marker | undefined;
  private positionIcon: L.Icon;

  constructor() {
    const defaultIconOpt = L.Icon.Default.prototype.options;
    const iconOpt: L.IconOptions = {
      iconUrl: 'assets/map-pin.png',
      iconSize: defaultIconOpt.iconSize,
      iconAnchor: defaultIconOpt.iconAnchor,
      popupAnchor: defaultIconOpt.popupAnchor,
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: defaultIconOpt.shadowSize,
      shadowAnchor: defaultIconOpt.shadowAnchor
    };
    this.positionIcon = L.icon(iconOpt);
  }

  addMarker(latlng: LatLng, map: L.Map, popupData?: string): void {
    const marker = L.marker(latlng);
    if (popupData) {
      marker.bindPopup(popupData);
    }
    marker.addTo(map);
    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.remove();
    });
  }

  setPositionMarker(latlng: LatLng, map: L.Map) {
    this.positionMarker = L.marker(latlng, {
      icon: this.positionIcon
    });
    this.positionMarker.addTo(map);
  }

  deletePosiotionMarker() {
    if (this.positionMarker) {
      this.positionMarker.remove();
    }
  }

}
