import { AbstractBaseEntity } from "@app/entities"
import { UUID } from "@app/types"
import { EntityData, EntityManager, EntityName, FilterQuery } from "@mikro-orm/core"
import { Injectable } from "@nestjs/common"

@Injectable()
export class EntityService {
	public constructor(private readonly entityManager: EntityManager) {
		//
	}

	public async findAll<E extends AbstractBaseEntity>(entityType: EntityName<E>): Promise<Array<E>> {
		const entities = await this.entityManager.find(entityType, {}, { populate: true })

		return entities
	}

	public async find<E extends AbstractBaseEntity>(entityType: EntityName<E>, where: FilterQuery<E>): Promise<Array<E>> {
		const entities = await this.entityManager.find(entityType, where, { populate: true })

		return entities
	}

	public async findOne<E extends AbstractBaseEntity>(entityType: EntityName<E>, where: FilterQuery<E>): Promise<E> {
		const entity = await this.entityManager.findOne(entityType, where, { populate: true })

		return entity as E
	}

	public async create<E extends AbstractBaseEntity>(entityType: EntityName<E>, entityData: EntityData<E>): Promise<E> {
		const newEntity = this.entityManager.create(entityType, entityData)

		await this.entityManager.persistAndFlush(newEntity)
		return newEntity
	}

	public async update<E extends AbstractBaseEntity>(entityType: EntityName<E>, id: UUID, entityData: EntityData<E>): Promise<E> {
		const entity = await this.entityManager.findOne(entityType, { [id]: id }, { populate: true })

		const updatedEntity = { ...entity, ...entityData }

		await this.entityManager.persistAndFlush(updatedEntity)
		return updatedEntity as E
	}
}
