import {Body, Controller, HttpException, HttpStatus, Post, Res} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";
import {UserService} from "../user/user.service";
import {User} from "../schemas/UserSchema";
import { md5Encrypt, validateEmail} from "../utils";
import {Public} from "./constants";
import {UserDto} from "./dto/user.dto";

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	@Public()
	@ApiOperation({ summary: 'Public' })
	@Post('/login')
	async login(@Body() authDto: AuthDto) {
		return this.authService.signIn(authDto);
	}

	@Public()
	@ApiOperation({ summary: 'Public' })
	@Post('/register')
	async register(@Body() authDto: AuthDto){
		if (!validateEmail(authDto.email)){
			throw new HttpException('Wrong email format', HttpStatus.BAD_REQUEST)
		}
		const existUser = await this.userService.findByEmail(authDto.email)
		if (existUser){
			throw new HttpException('Email existed', HttpStatus.CONFLICT)
		}

		const user = new User()
		user.username = authDto.email
		user.email = authDto.email
		user.password = md5Encrypt(authDto.password)
		const newUser = await this.userService.createUser(user)
		const userDto = new UserDto()
		userDto._id = newUser._id
		userDto.email = newUser.email
		userDto.username = newUser.username
		return userDto
	}
}
