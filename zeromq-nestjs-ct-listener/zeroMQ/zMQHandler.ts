import { Server, CustomTransportStrategy, MessageHandler } from "@nestjs/microservices";
import { zMQTick } from "./zMQTick";

export class zMQHandler extends Server implements CustomTransportStrategy {
    private zMQTicks: zMQTick;


    public listen(callback: () => void): void {
        this.zMQTicks = new zMQTick();
        this.zMQTicks.start();
        this.zMQTicks.on("data", (msg: any) => {
            const gatheredData = JSON.parse(msg);
            const msgHandlerName = gatheredData[0].toString();
            gatheredData.shift();
            const data = gatheredData;
            this.listener(msgHandlerName, data);
        });
        callback();
    }

    public async listener(event: string, data: [] = []): Promise<void> {
        const handler: MessageHandler | undefined = this.messageHandlers.get(event);
        if (!handler) {
            return;
        }
        await handler(data);
    }

    public close(): void {
        this.zMQTicks.stop();
    }

}