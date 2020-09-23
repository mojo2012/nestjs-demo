import { Controller, Get } from '@nestjs/common';
import { ResponseEntity, of } from 'src/dtos/ResponseEntity';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<ResponseEntity<string>> {
    const data = await this.appService.getHello();

    return of(data);
  }
}
