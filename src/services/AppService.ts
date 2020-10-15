import { User } from "@app/entities/User"
import { UserRepository } from "@app/repositories/UserRepository"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "nestjs-mikro-orm"

@Injectable()
export class AppService {
	public constructor(
		@InjectRepository(User)
		private readonly userRepository: UserRepository
	) {}

	public async getUsers(): Promise<Array<User>> {
		// this.userRepository.findOne()

		return this.userRepository.findAll()
	}

	// public async createUser(uid: string): Promise<User> {
	// this.userRepository.findOne()

	// const newUser: User = new User({ uid: uid }
	// this.userRepository.persist(newUser)

	// return newUser
	// }
}
