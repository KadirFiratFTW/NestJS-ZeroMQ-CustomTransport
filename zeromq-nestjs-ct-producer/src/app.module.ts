import { Module } from '@nestjs/common';
import { zMQTick } from 'zeroMQ/zMQSocket';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, zMQTick],
})
export class AppModule { }
