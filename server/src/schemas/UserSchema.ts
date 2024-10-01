import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany} from 'typeorm';
import {Workspace} from "./WorkspaceSchema";



@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid') // 这里指定使用 UUID
	_id: string;

	@Column()
	username: string;

	@Column()
	email: string

	@Column()
	password: string

	@ManyToMany(() => Workspace, workspace => workspace.users)
	@JoinTable()
	workspaces: Workspace[];

	@Column({ default: true })
	isActive: boolean;
}
