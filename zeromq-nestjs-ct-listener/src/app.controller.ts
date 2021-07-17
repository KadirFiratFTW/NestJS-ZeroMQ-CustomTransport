import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private viewers: number = 0;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern("sayHello")
  public sayHello(data: Array<any>) {
    console.log(data[0]);
  }

  @MessagePattern("addViewer")
  public addViewer(data: Array<any>) {
    this.viewers++;
    console.log(`Current viewers ${this.viewers}`);
  }

  @MessagePattern("removeViewer")
  public removeViewers(data: Array<any>) {
    this.viewers--;
    console.log(`Current viewers ${this.viewers}`);
  }
}
