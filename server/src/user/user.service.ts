import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../schemas/UserSchema";


@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findOne(_id: string, options?: { relations: string[] }): Promise<User> {
		return this.userRepository.findOne({
			where: {_id: _id},
			relations: options?.relations || []
		});
	}
	async findByEmail(email: string): Promise<User | undefined> {
		return this.userRepository.findOne({ where: {email: email} });
	}
	async remove(_id: string): Promise<void> {
		await this.userRepository.delete(_id);
	}

	async createUser(user: User): Promise<User>{
		const newUser = this.userRepository.create(user)
		return await this.userRepository.save(newUser)
	}
}
