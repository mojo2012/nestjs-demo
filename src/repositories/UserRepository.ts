import { User } from "@app/entities/User"
import { AbstractEntityRepository } from "@app/repositories"
import { EntityManager, Repository } from "@mikro-orm/core"
import { Injectable } from "@nestjs/common"

@Repository(User)
@Injectable()
export class UserRepository extends AbstractEntityRepository<User> {
	public constructor(public readonly entityManager: EntityManager) {
		super(entityManager, User)
	}
}
