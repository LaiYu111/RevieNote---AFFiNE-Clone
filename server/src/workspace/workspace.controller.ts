import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WorkspaceService} from "./workspace.service";
import {CreateWorkspaceDto} from "./dto/create-workspace.dto";
import {Workspace} from "../schemas/WorkspaceSchema";
import {UserService} from "../user/user.service";

@ApiTags('Workspace')
@Controller('api/workspace')
export class WorkspaceController {
	constructor(
		private workspaceService: WorkspaceService,
		private userService: UserService
	) {
	}

	@Get('all/:userId')
	async getAllWorkspace(@Param('userId') userId: string){
		const user = await this.userService.findOne(userId, {relations: ['workspaces']})
		return user.workspaces
	}

	@Post()
	async createWorkspace(@Body() createWorkspace: CreateWorkspaceDto){
		const user = await this.userService.findOne(createWorkspace.userId)
		if (user){
			const workspace = new Workspace()
			workspace.users = [user]
			workspace.name = createWorkspace.name
			workspace.isPublic = createWorkspace.isPublic
			return this.workspaceService.createWorkspace(workspace)
		}
		return "fail"
	}
}
