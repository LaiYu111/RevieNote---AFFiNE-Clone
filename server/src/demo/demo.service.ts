import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Demo} from "../schemas/demo.schema";
import {Model} from "mongoose";

@Injectable()
export class DemoService {
	constructor(@InjectModel(Demo.name) private demoModel: Model<Demo>) {
	}

	async create(){
		const d = new Demo()
		d.demo = 'ssss'
		return this.demoModel.create(d)
	}

	async findAll(){
		return this.demoModel.find().exec()
	}
}
