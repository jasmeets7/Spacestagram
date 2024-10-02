import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../nasa.service';
import { post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading = true;

  receivedData:Array<post> = [];

  url = window.location.href;

  share: boolean = false;

  date: string = "";

  constructor(public service:NasaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['date']) {
      this.date = this.route.snapshot.params['date'];
      this.isDateAvailable(this.date);
    } else
        this.service.getNasaData();
    this.service.getData().subscribe(data => {
      this.receivedData = data;
      this.loading = false;
    });
  }

  onShare(){
    this.share = !this.share;
  }

  onCopy(urlField:any){
    urlField.focus();
    urlField.select();
    document.execCommand("Copy");
  }

  isDateAvailable(date: string){
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate < currentDate) 
      this.service.getNasaDateData(date);
    else {
      alert("Select a valid Date");
      this.router.navigate(["/"]);
    };
  }

}