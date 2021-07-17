import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { zMQHandler } from 'zeroMQ/zMQHandler';
import { AppModule } from './app.module';

async function bootstrap() {
  const zeroStrategy = new zMQHandler();
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      strategy: zeroStrategy,
      autoFlushLogs: false
    },
  );

  app.listen(() => {
    console.log("ZeroMQ MicroService Started.")
  })
}

bootstrap().catch(console.error);
