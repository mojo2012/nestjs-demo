import { UserGroup } from "@app/entities"
import { AbstractEntityRepository } from "@app/repositories"
import { EntityManager, Repository } from "@mikro-orm/core"
import { Injectable } from "@nestjs/common"

@Repository(UserGroup)
@Injectable()
export class UserGroupRepository extends AbstractEntityRepository<UserGroup> {
	public constructor(public readonly entityManager: EntityManager) {
		super(entityManager, UserGroup)
	}
}
