import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
	@ApiProperty()
	email: string; // username or email

	@ApiProperty()
	password: string;
}
