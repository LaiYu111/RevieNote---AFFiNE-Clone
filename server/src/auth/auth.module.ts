import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../schemas/UserSchema";
import {UserModule} from "../user/user.module";
import { jwtConstants } from './constants';
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthGuard} from "./auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secrets,
      signOptions: { expiresIn: '3d' },
    }),

    UserModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 全局启动身份验证
    },
  ],
  exports: [AuthService]
})
export class AuthModule {}
