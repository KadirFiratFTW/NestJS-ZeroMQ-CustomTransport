import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("sayHello")
  sayHello(): string {
    return this.appService.getHello();
  }

  @Get("addViewer")
  addViewer(): string {
    return this.appService.addViewer();
  }
  @Get("removeViewer")
  removeViewer(): string {
    return this.appService.removeViewer();
  }

}
