
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations:[
    trigger('card',[
      state('in', style({opacity: 1, transform: 'translateX(0px)'})),
      transition('void=>*', [
        style({opacity: 0, transform: 'translateX(-100px)'}), animate(300)
      ]),
    ])
  ]
})
export class WeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weather: Weather | undefined;
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(this.weather){
      this.weather = undefined;
    }
    this.weatherService
      .getWeather(form.value.cityName)
      .subscribe((response) => {
        console.log(response);
        this.weather = response;
      });
  }

  getLocation(form: NgForm){
    if(this.weather){
      this.weather = undefined;
    }
    form.reset();
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        const {latitude, longitude} = position.coords;
        this.weatherService.getWeather("", `${latitude}`, `${longitude}`).subscribe((response)=>{
          this.weather = response
        })
      },()=>{
        alert(
          'Permission to access geolocation denied. Please use Search Engine. '
        )
      })
    }
  }
}
