import {Controller, Get, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {DemoService} from "./demo.service";

@ApiTags('demo')
@Controller('api/demo')
export class DemoController {
	constructor(private demoService: DemoService) {
	}

	@Post()
	async create(){
		return this.demoService.create()
	}

	@Get()
	async get(){
		return this.demoService.findAll()
	}
}
