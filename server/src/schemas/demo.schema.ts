import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type DemoDocument = HydratedDocument<Demo>

@Schema()
export class Demo{
	@Prop()
	demo: string
}

export const DemoSchema = SchemaFactory.createForClass(Demo)
