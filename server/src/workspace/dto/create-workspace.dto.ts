import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
	@ApiProperty()
	name: string

	@ApiProperty()
	userId: string

	@ApiProperty()
	isPublic?: boolean
}
