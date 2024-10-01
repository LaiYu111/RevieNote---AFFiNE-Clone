import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./UserSchema";
import {Page} from "./PageSchema";



@Entity()
export class Workspace {
	@PrimaryGeneratedColumn('uuid')
	_id: string;

	@Column()
	name: string;

	@Column({default: false})
	isPublic: boolean;

	@ManyToMany(() => User, user => user.workspaces)
	users: User[];

	@OneToMany(() => Page, page => page.workspace)
	pages: Page[]
}
