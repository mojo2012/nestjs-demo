import { ResponseEntity } from "@app/dtos"
import { AbstractBaseEntity } from "@app/entities"
import { EntityService } from "@app/services"
import { UUID } from "@app/types"
import { EntityName } from "@mikro-orm/core"
import { Body, Controller, Get, HttpStatus, Param, Post, Put } from "@nestjs/common"

@Controller()
export class EntityController {
	public constructor(private readonly entityService: EntityService) {}

	@Get("/:entityType")
	public async getAll(@Param() params: { entityType: EntityName<AbstractBaseEntity> }): Promise<ResponseEntity<Array<AbstractBaseEntity>>> {
		const entities = await this.entityService.findAll(params.entityType)

		return ResponseEntity.of({
			body: entities
		})
	}

	@Get("/:entityType/:id")
	public async findOne(@Param() params: { entityType: EntityName<AbstractBaseEntity>; id: UUID }): Promise<ResponseEntity<AbstractBaseEntity>> {
		const entity = await this.entityService.findOne(params.entityType, { id: params.id })

		return ResponseEntity.of({
			body: entity
		})
	}

	@Post("/:entityType")
	public async create(
		@Param() params: { entityType: EntityName<AbstractBaseEntity> },
		@Body() body: AbstractBaseEntity
	): Promise<ResponseEntity<AbstractBaseEntity>> {
		const entity = await this.entityService.create(params.entityType, body)
		return ResponseEntity.of({
			status: HttpStatus.CREATED,
			body: entity
		})
	}

	@Put("/:entityType/:id")
	public async update(
		@Param() params: { entityType: EntityName<AbstractBaseEntity>; id: string },
		@Body() body: AbstractBaseEntity
	): Promise<ResponseEntity<AbstractBaseEntity>> {
		const entity = await this.entityService.update(params.entityType, params.id, body)

		return ResponseEntity.of({
			status: HttpStatus.CREATED,
			body: entity
		})
	}
}
