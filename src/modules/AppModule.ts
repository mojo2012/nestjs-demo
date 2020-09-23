import { Module } from '@nestjs/common';
import AppService from 'src/services/AppService';
import AppController from '../endpoints/AppController';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
