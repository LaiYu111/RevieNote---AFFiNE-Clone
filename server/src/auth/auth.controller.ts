import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {User} from "../schemas/UserSchema";
import {md5Encrypt} from "../utils";

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	@ApiOperation({ summary: 'sign in' })
	@Post('/login')
	async login(@Body() authDto: AuthDto) {
		return this.authService.signIn(authDto);
	}

	@ApiOperation({ summary: 'register' })
	@Post('/register')
	async register(@Body() authDto: AuthDto){
		const user = new User()
		user.username = authDto.email
		user.email = authDto.email
		user.password = md5Encrypt(authDto.password)
		return this.userService.createUser(user)
	}
}
