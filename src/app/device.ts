import { DeviceTwin }           from './deviceTwin';
export class Device {
  deviceId: string;
  generationId: string;
  status: string;
  statusUpdatedTime: string;
  connectionState: string;
  connectionStateUpdatedTime: string;
  lastActivityTime: string;
  cloudToDeviceMessageCount: number;
  deviceTwin: DeviceTwin;

}
