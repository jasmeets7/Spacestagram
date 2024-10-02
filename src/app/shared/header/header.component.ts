import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../nasa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  url = window.location.origin;

  constructor(public service:NasaService) { }

  onDateChange(event:any){
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) 
      this.service.getNasaDateData(event.target.value);
    else {
      alert("Select a valid Date");
      event.target.value = "";
    };
  }

}