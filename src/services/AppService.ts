import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
