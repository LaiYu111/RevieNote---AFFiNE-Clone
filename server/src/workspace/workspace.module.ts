import { Module} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Workspace} from "../schemas/WorkspaceSchema";
import {UserModule} from "../user/user.module";


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([Workspace])
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
