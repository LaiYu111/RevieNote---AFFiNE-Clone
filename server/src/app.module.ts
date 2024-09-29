import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { DemoModule } from './demo/demo.module';
import * as process from "node:process";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STR),
    DemoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
