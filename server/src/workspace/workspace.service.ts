import { Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Workspace} from "../schemas/WorkspaceSchema";
import {Repository} from "typeorm";

@Injectable()
export class WorkspaceService {
	constructor(
		@InjectRepository(Workspace)
		private workspaceRepository: Repository<Workspace>,
	) {
	}

	async createWorkspace( workspaceData: Partial<Workspace>): Promise<Workspace> {
		const workspace = this.workspaceRepository.create(workspaceData);
		return this.workspaceRepository.save(workspace);
	}

	async findWorkspace(_id: string, options?: { relations: string[] }){
		return this.workspaceRepository.findOne({
			where: {_id: _id},
			relations: options?.relations || []
		})
	}
}
