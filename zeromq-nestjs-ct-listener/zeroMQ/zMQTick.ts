import { EventEmitter } from "events";
import * as zMQ from "zeromq";

export class zMQTick extends EventEmitter {
    private zMQClient = null;

    start(): void {
        if (this.zMQClient) return console.log("zMQ Client Already Working.");
        const eventHandler: EventEmitter = this;

        this.zMQClient = zMQ.socket("pull")
        this.zMQClient.connect("tcp://" + process.env.PRODUCER_HOST + ":3000");

        console.log("ZeroMQ Client Connected on ::3000");
        this.zMQClient.on("message", function (msg: Buffer) {
            eventHandler.emit("data", msg.toString());
        });
    }

    stop(): void {
        if (!this.zMQClient) return console.log("zMQ Closed.");
        this.zMQClient.close();
        this.zMQClient = null;
    }
}
