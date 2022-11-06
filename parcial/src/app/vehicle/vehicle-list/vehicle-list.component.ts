import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles : Array<Vehicle> = [];
  totalVehicles = new Map();

  constructor(private vehicleService: VehicleService) { }

  getVehicles():void{
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      vehicles.forEach((vehicle : Vehicle) => {
        let marca : string = vehicle.marca;
        if(this.totalVehicles.has(marca)){
          this.totalVehicles.set(marca, this.totalVehicles.get(marca) + 1)
        } else {
          this.totalVehicles.set(marca, 1)
        }
      })
    });
  }

  ngOnInit() {
    this.getVehicles();
  }
}
