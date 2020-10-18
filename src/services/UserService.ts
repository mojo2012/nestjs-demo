import { User } from "@app/entities/User"
import { UserGroupRepository, UserRepository } from "@app/repositories"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserService {
	public constructor(private readonly userRepository: UserRepository, private readonly userGroupRepository: UserGroupRepository) {
		//
	}

	public async getUsers(): Promise<Array<User>> {
		const users = await this.userRepository.findAll()

		return users
	}

	public async createUser(user: User): Promise<User> {
		const newUser = this.userRepository.create(user)

		// if (newUser.group) {
		// 	await this.userGroupRepository.persistAndFlush(newUser.group)
		// }

		await this.userRepository.persistAndFlush(newUser)
		return newUser
	}
}
