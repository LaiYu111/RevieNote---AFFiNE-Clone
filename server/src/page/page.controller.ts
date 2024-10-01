import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PageService} from "./page.service";
import {CreatePageDto} from "./dto/create-page.dto";
import {WorkspaceService} from "../workspace/workspace.service";
import {Page} from "../schemas/PageSchema";

@ApiTags('Page')
@Controller('api/page')
export class PageController {
	constructor(
		private pageService: PageService,
		private workspaceService: WorkspaceService
	) {}

	@Get('all/:workspaceId')
	async getAllPages(@Param('workspaceId') workspaceId: string){
		const workspace = await this.workspaceService.findWorkspace(workspaceId, {
			relations: ['pages']
		})
		return workspace.pages
	}

	@Post()
	async createPage(@Body() createPageDto: CreatePageDto){
		const workspace = await this.workspaceService.findWorkspace(createPageDto.workspaceId)
		if (workspace){
			const page = new Page()
			page.workspace = workspace
			return this.pageService.createPage(page)
		}
		return 'fail'
	}
}
