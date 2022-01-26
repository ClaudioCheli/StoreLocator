import { AfterViewInit, Component } from '@angular/core';
import { icon, latLng, map, Marker, tileLayer } from 'leaflet';
import { MarkerService } from './marker.service';
import { PositionService } from '../position.service';
import { StoreService } from '../store/store.service';
import { Store } from '../store/store.model';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;

  constructor(
    private markerService: MarkerService,
    private storeService: StoreService,
    private positionService: PositionService) { }

  private initMap(): void {

    this.map = map('map', {
      center: latLng(43.4254835, 11.7966376),
      zoom: 10
    });

    const tiles = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.map.addEventListener("click", (event: L.LeafletMouseEvent) => {
      this.markerService.addMarker(event.latlng, this.map);
      console.log(event.latlng);
    });
    this.initStoreService();
    this.initPositionService();
  }

  private initStoreService() {
    this.storeService
      .loadStores()
      .subscribe((stores: Store[]) => {
        this.markerService.clearMarkers();
        stores.forEach((store: Store) => {
          this.markerService.addMarker(latLng(store.lat, store.long), this.map);
        });
      });
  }

  private initPositionService() {
    this.positionService
      .listen()
      .subscribe((position: L.LatLng) => {
        this.markerService.deletePosiotionMarker();
        this.markerService.setPositionMarker(position, this.map);
        this.map.flyTo(position);
        this.storeService.getNearby(position);
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
