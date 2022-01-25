import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { latLng, LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  constructor(private http: HttpClient) { }

  search(value: string): Promise<LatLng> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const httpHeaders = new HttpHeaders(
          {
            "User-Agent": "Test Store Locator"
          }
        );

        this.http.get<any[]>("https://nominatim.openstreetmap.org/search?format=jsonv2&q=" + value,
          { headers: httpHeaders })
          .subscribe((resp: any[]) => {
            console.log(resp);
            if (resp) {
              const retV: LatLng = latLng(
                resp[0].lat,
                resp[0].lon
              );
              resolve(retV);
            }
          });
      }, 1500)
    });
  }

}
