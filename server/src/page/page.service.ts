import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Page} from "../schemas/PageSchema";
import {Repository} from "typeorm";

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private pageRepository: Repository<Page>
	) {}

	async createPage(page: Page){
		const newPage = this.pageRepository.create(page)
		return this.pageRepository.save(newPage)
	}
}
