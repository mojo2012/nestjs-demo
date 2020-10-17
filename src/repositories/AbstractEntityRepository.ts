import { AnyEntity, EntityManager, EntityName, EntityRepository } from "@mikro-orm/core"

export abstract class AbstractEntityRepository<T extends AnyEntity<T>> extends EntityRepository<T> {
	protected constructor(entityManager: EntityManager, entityType: EntityName<T>) {
		super(entityManager, entityType)
	}
}
