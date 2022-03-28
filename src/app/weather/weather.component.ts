
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weather: Weather | undefined;
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    this.weatherService
      .getWeather(form.value.cityName)
      .subscribe((response) => {
        console.log(response);
        this.weather = response;
      });
  }

  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        console.log(typeof(position));
        const {latitude, longitude} = position.coords;
        this.weatherService.getWeather("", `${latitude}`, `${longitude}`).subscribe((response)=>{
          console.log(response);
          this.weather = response
        })
      },()=>{
        alert(
          'location permission denied. Please type city name. '
        )
      })
    }
  }
}
