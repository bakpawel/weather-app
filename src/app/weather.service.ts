import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  //for fetching data from server
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<Weather> {
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', environment.apiKey);
    return this.http.get<Weather>(environment.apiUrl + params);
  }
}
