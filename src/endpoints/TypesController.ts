import { ResponseEntity } from "@app/dtos"
import { AbstractBaseEntity } from "@app/entities"
import { EntityName, MikroORM } from "@mikro-orm/core"
import { Controller, Get, Param } from "@nestjs/common"

@Controller("/types")
export class TypesController {
	public constructor(private readonly orm: MikroORM) {}

	@Get("/")
	public async findAll(): Promise<ResponseEntity<Array<Record<string, unknown>>>> {
		const emMetadata: any = this.orm.em.getMetadata()
		const entityMetadata: Record<string, any> = emMetadata.metadata

		const entityTypes = Object.getOwnPropertyNames(entityMetadata).map((t) => {
			const typeInfo: any = entityMetadata[t]

			return {
				className: t,
				superClass: typeInfo.extends,
				isAbstract: typeInfo.abstract,
				class: typeInfo.class,
				primaryKey: typeInfo.primaryKeys,
				properties: this.convertTypeProperties(typeInfo.properties)
			}
		})

		return ResponseEntity.of({
			body: entityTypes
		})
	}

	private convertTypeProperties(properties: any): Array<Record<string, unknown>> {
		const propertiesNames = Object.keys(properties)

		return propertiesNames.map((prop) => {
			const propValue: any = properties[prop]

			return {
				name: prop,
				type: propValue.type
			}
		})
	}

	@Get("/:entityType")
	public async findOne(@Param() params: { entityType: EntityName<AbstractBaseEntity> }): Promise<ResponseEntity<Record<string, unknown>>> {
		const entityTypes = this.getEntityTypes() //
			.filter((t) => typeof params.entityType)

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
