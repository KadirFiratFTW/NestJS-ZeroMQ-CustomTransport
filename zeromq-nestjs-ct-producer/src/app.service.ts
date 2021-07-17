import { Injectable } from '@nestjs/common';
import { zMQTick } from 'zeroMQ/zMQSocket';
@Injectable()
export class AppService {
  constructor(private zMQSocket: zMQTick = new zMQTick()) {

  }
  getHello(): string {
    this.zMQSocket.emit("sayHello", ["sa birader"]);
    return 'Hello World!';
  }

  addViewer(): string {
    this.zMQSocket.emit("addViewer", []);
    return "Viewer added.";
  }

  removeViewer(): string {
    this.zMQSocket.emit("removeViewer", []);
    return "Viewer removed.";
  }
}
