import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";
import {User} from "../schemas/UserSchema";
import {Workspace} from "../schemas/WorkspaceSchema";
import {Page} from "../schemas/PageSchema";



@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_DB_HOST,
			port: parseInt(process.env.POSTGRES_DB_PORT, 10),
			username: process.env.POSTGRES_DB_USERNAME,
			password: process.env.POSTGRES_DB_PASSWORD,
			database: process.env.POSTGRES_DB_DATABASE,
			entities: [User, Workspace, Page],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([User])
	],
	exports: [TypeOrmModule]
})
export class DatabaseModule {
}
