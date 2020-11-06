import { ResponseEntity } from "@app/dtos"
import { AbstractBaseEntity } from "@app/entities"
import { EntityName, MikroORM } from "@mikro-orm/core"
import { Controller, Get, Param } from "@nestjs/common"

@Controller("/types")
export class TypesController {
	public constructor(private readonly orm: MikroORM) {}

	@Get("/")
	public async findAll(): Promise<ResponseEntity<Array<Record<string, unknown>>>> {
		const entityTypes = this.getEntityTypes()

		return ResponseEntity.of({
			body: entityTypes
		})
	}

	@Get("/:entityType")
	public async findOne(@Param() params: { entityType: EntityName<AbstractBaseEntity> }): Promise<ResponseEntity<Record<string, unknown>>> {
		const entityTypes = this.getEntityTypes().filter((t) => typeof params.entityType)

		return ResponseEntity.of({
			body: {}
		})
	}

	private getEntityTypes(): Array<Record<string, unknown>> {
		const ormConfig: any = this.orm.config
		const entityTypes: Array<Record<string, unknown>> = ormConfig.options.entities

		return entityTypes
	}
}
