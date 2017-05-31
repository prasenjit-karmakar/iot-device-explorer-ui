import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Device }                from './device';
import { DeviceService }         from './device.service';

@Component({
  selector: 'my-devices',
  templateUrl: './devices.component.html',
  styleUrls: [ './devices.component.css' ]
})

export class DevicesComponent implements OnInit {
  devices: Device[];
  selectedDevice: Device;

  constructor(
    private deviceService: DeviceService,
    private router: Router) { }

  getDevices(): void {
    this.deviceService
        .getDevices()
        .then(devices => this.devices = devices);
  }

  add(deviceId: string): void {
    deviceId = deviceId.trim();
    if (!deviceId) { return; }
    this.deviceService.create(deviceId)
      .then(device => {
        this.devices.push(device);
        this.selectedDevice = null;
      });
  }

  delete(device: Device): void {
    this.deviceService
        .delete(device.deviceId)
        .then(() => {
          this.devices = this.devices.filter(d => d !== device);
          if (this.selectedDevice === device) { this.selectedDevice = null; }
        });
  }

  ngOnInit(): void {
    this.getDevices();
  }

  //onSelect(device: Device): void {
  //  this.selectedDevice = device;
  //}

  gotoDetail(device: Device): void {
   this.selectedDevice = device;
    this.router.navigate(['/detail', this.selectedDevice.deviceId]);
  }
}
