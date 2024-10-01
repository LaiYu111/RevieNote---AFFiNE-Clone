import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    WorkspaceModule,
    PageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
