import { User } from "@app/entities/User"
import { UserRepository } from "@app/repositories"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserService {
	public constructor(private readonly userRepository: UserRepository) {}

	public async getUsers(): Promise<Array<User>> {
		const users = await this.userRepository.findAll()

		return users
	}

	public async createUser(user: User): Promise<User> {
		const newUser = this.userRepository.create(user)

		await this.userRepository.persistAndFlush(newUser)
		return newUser
	}
}
