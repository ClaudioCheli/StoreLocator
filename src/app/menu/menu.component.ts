import { Component, OnInit } from '@angular/core';
import { LatLng } from 'leaflet';
import { MapSearchService } from '../map/map-search.service';
import { PositionService } from '../position.service';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private mapSearch: MapSearchService,
    private storeService: StoreService,
    private positionService: PositionService) { }

  ngOnInit(): void {
  }

  search(value: string) {
    if (!value) {
      return;
    }
    console.log("Search: " + value);
    this.mapSearch.search(value)
      .then((position: LatLng) => {
        this.positionService.set(position);
        this.storeService.getNearby(position);
      });
  }

  find() {
    this.positionService.geolocate();
  }

}
