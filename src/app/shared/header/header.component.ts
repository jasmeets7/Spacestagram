import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NasaService } from '../../nasa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HeaderComponent {
  url = window.location.origin;
  today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  constructor(public service: NasaService) {}

  onDateChange(event: any) {
    if (!event.target.value) return;
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    if (selectedDate < currentDate)
      this.service.getNasaDateData(event.target.value);
    else {
      alert('Select a valid Date');
      event.target.value = '';
    }
  }
}
