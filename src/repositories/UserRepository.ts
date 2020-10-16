import { User } from "@app/entities/User"
import { EntityManager, EntityRepository, Repository } from "mikro-orm"

@Repository(User)
export class UserRepository extends EntityRepository<User> {
	public constructor(private readonly entityManager: EntityManager) {
		super(entityManager, User)
	}
}
