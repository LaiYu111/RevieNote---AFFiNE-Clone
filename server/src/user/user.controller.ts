import { Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";



@ApiTags('User')
@Controller('api/user')
export class UserController {
	constructor(private userService: UserService) {
	}

	@Get()
	getUser(){
		return this.userService.findAll()
	}

}
