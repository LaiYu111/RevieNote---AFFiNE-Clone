import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Workspace} from "./WorkspaceSchema";




@Entity()
export class Page {
	@PrimaryGeneratedColumn('uuid') // 这里指定使用 UUID
	_id: string;

	@Column({default: ''})
	title: string;

	@Column({default: ''})
	plaintext: string;

	@Column({type: 'jsonb', default: {}})
	lexicalData: any;

	@Column({default: false})
	softDelete: boolean;

	@ManyToOne(() => Workspace, workspace => workspace.pages, { onDelete: 'CASCADE' })
	workspace: Workspace
}
