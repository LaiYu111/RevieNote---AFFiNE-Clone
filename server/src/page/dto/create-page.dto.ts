import {ApiProperty} from "@nestjs/swagger";

export class CreatePageDto{
	@ApiProperty()
	workspaceId:string
}
