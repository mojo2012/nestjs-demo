import { User } from "@app/entities/User"
import { AbstractEntityRepository } from "@app/repositories/AbstractEntityRepository"
import { Injectable } from "@nestjs/common"
import { EntityManager, Repository } from "mikro-orm"

@Repository(User)
@Injectable()
export class UserRepository extends AbstractEntityRepository<User> {
	public constructor(public readonly entityManager: EntityManager) {
		super(entityManager, User)
	}
}
