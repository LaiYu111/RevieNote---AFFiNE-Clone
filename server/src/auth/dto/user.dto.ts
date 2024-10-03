import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty()
	email: string;

	@ApiProperty()
	_id: string;

	@ApiProperty()
	username: string;
}
