import { Component, OnInit } from '@angular/core';
import { LatLng } from 'leaflet';
import { MapSearchService } from '../map/map-search.service';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private mapSearch: MapSearchService,
    private positionService: PositionService) { }

  ngOnInit(): void {
  }

  search(value: string) {
    if (!value) {
      return;
    }
    this.loading = true;
    console.log("Search: " + value);
    this.mapSearch.search(value)
      .then((position: LatLng) => {
        this.positionService.set(position);
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  find() {
    this.positionService.geolocate();
  }

}
