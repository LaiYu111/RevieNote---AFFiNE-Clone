import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags} from "@nestjs/swagger";
import {Public} from "./auth/constants";

@ApiTags('test only')
@Controller('ignore')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/private')
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/public')
  getXXX(): number {
    return 23123123
  }
}
