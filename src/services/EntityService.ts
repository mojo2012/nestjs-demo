import { AbstractBaseEntity, User } from "@app/entities"
import { EntityData, EntityManager, EntityName } from "@mikro-orm/core"
import { Injectable } from "@nestjs/common"

@Injectable()
export class EntityService {
	public constructor(private readonly entityManager: EntityManager) {
		//
	}

	public async get<E extends AbstractBaseEntity>(entityType: EntityName<E>): Promise<Array<E>> {
		this.entityManager.getRepository(User).findAll()

		const entities = await this.entityManager.find(entityType, {}, { populate: true })

		return entities
	}

	public async create<E extends AbstractBaseEntity>(entityType: EntityName<E>, entityData: EntityData<E>): Promise<E> {
		const newEntity = this.entityManager.create(entityType, entityData)

		await this.entityManager.persistAndFlush(newEntity)
		return newEntity
	}
}
