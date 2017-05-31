"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var device_service_1 = require("./device.service");
var DevicesComponent = (function () {
    function DevicesComponent(deviceService, router) {
        this.deviceService = deviceService;
        this.router = router;
    }
    DevicesComponent.prototype.getDevices = function () {
        var _this = this;
        this.deviceService
            .getDevices()
            .then(function (devices) { return _this.devices = devices; });
    };
    DevicesComponent.prototype.add = function (deviceId) {
        var _this = this;
        deviceId = deviceId.trim();
        if (!deviceId) {
            return;
        }
        this.deviceService.create(deviceId)
            .then(function (device) {
            _this.devices.push(device);
            _this.selectedDevice = null;
        });
    };
    DevicesComponent.prototype.delete = function (device) {
        var _this = this;
        this.deviceService
            .delete(device.deviceId)
            .then(function () {
            _this.devices = _this.devices.filter(function (d) { return d !== device; });
            if (_this.selectedDevice === device) {
                _this.selectedDevice = null;
            }
        });
    };
    DevicesComponent.prototype.ngOnInit = function () {
        this.getDevices();
    };
    //onSelect(device: Device): void {
    //  this.selectedDevice = device;
    //}
    DevicesComponent.prototype.gotoDetail = function (device) {
        this.selectedDevice = device;
        this.router.navigate(['/detail', this.selectedDevice.deviceId]);
    };
    return DevicesComponent;
}());
DevicesComponent = __decorate([
    core_1.Component({
        selector: 'my-devices',
        templateUrl: './devices.component.html',
        styleUrls: ['./devices.component.css']
    }),
    __metadata("design:paramtypes", [device_service_1.DeviceService,
        router_1.Router])
], DevicesComponent);
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map