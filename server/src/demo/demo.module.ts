import { Module } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Demo, DemoSchema} from "../schemas/demo.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Demo.name, schema: DemoSchema}])
  ],
  controllers: [DemoController],
  providers: [DemoService]
})
export class DemoModule {}
