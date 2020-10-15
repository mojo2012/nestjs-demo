import { User } from "@app/entities/User"
import { Injectable } from "@nestjs/common"
import { EntityRepository } from "mikro-orm"

@Injectable()
export class UserRepository extends EntityRepository<User> {
	//
}
