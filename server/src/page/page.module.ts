import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Page} from "../schemas/PageSchema";
import {WorkspaceModule} from "../workspace/workspace.module";

@Module({
  imports: [
    DatabaseModule,
    WorkspaceModule,
    TypeOrmModule.forFeature([Page])
  ],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
