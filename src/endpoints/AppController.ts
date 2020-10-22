import { ResponseEntity } from "@app/dtos"
import { AbstractBaseEntity } from "@app/entities"
import { User } from "@app/entities/User"
import { EntityService } from "@app/services"
import { EntityName } from "@mikro-orm/core"
import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common"

@Controller()
export class EntityController {
	public constructor(private readonly entityService: EntityService) {}

	@Get("/:entityType")
	public async getAll(@Param() params: { entityType: EntityName<AbstractBaseEntity> }): Promise<ResponseEntity<Array<AbstractBaseEntity>>> {
		const entities = await this.entityService.get(params.entityType)

		return ResponseEntity.of({
			body: entities
		})
	}

	@Post("/:entityType")
	public async createUser(@Param() params: { entityType: EntityName<AbstractBaseEntity> }, @Body() body: User): Promise<ResponseEntity<AbstractBaseEntity>> {
		const user = await this.entityService.create(params.entityType, body)
		return ResponseEntity.of({
			status: HttpStatus.CREATED,
			body: user
		})
	}
}
