import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { md5Encrypt } from '../utils';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(authDto: AuthDto) {
		const user = await this.userService.findByEmail(authDto.email);

		if (user?.password !== md5Encrypt(authDto.password)) {
			throw new UnauthorizedException('Invalid email or password');
		}

		// Generate a JWT
		const payload = {
			email: user.email,
			username: user.username,
			_id: user._id
		};
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '7d',
		});
		const decodedToken = this.jwtService.decode(accessToken) as { exp: number };

		return {
			access_token: accessToken,
			expires_in: decodedToken.exp,
		};
	}
}
