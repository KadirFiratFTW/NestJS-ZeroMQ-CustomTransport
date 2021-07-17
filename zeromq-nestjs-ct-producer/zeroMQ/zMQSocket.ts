import * as zMQ from "zeromq";

export class zMQTick {
    private zMQClient = null;
    constructor() {
        this.start();
        return this;
    }
    start(): void {
        if (this.zMQClient) return console.log("zMQ Client Already Working.");
        this.zMQClient = zMQ.socket("push")
        this.zMQClient.bindSync("tcp://0.0.0.0:3000");
    }

    emit(pattern: string, data: Array<any>): void {
        const sockData = JSON.stringify([pattern, ...data])
        this.zMQClient.send(sockData);
        console.log("sended");
    }

    stop(): void {
        if (!this.zMQClient) return console.log("zMQ Closed.");
        this.zMQClient.close();
        this.zMQClient = null;
    }
}
