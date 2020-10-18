import { ResponseEntity } from "@app/dtos"
import { User } from "@app/entities/User"
import { UserService } from "@app/services"
import { Body, Controller, Get, Post } from "@nestjs/common"

@Controller()
export class AppController {
	public constructor(private readonly userService: UserService) {}

	@Get("/users")
	public async listAllUsers(): Promise<ResponseEntity<Array<User>>> {
		const users = await this.userService.getUsers()

		return ResponseEntity.of({
			body: users
		})
	}

	@Post("/users")
	public async createUser(@Body() body: User): Promise<ResponseEntity<User>> {
		const user = await this.userService.createUser(body)
		return ResponseEntity.of({
			body: user
		})
	}
}
