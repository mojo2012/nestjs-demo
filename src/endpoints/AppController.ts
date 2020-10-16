import { ResponseEntity } from "@app/dtos"
import { User } from "@app/entities/User"
import { UserService } from "@app/services"
import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common"
import { NotNullConstraintViolationException } from "mikro-orm"

@Controller()
export class AppController {
	public constructor(private readonly userService: UserService) {}

	@Get("/users")
	public async listAllUsers(): Promise<ResponseEntity<Array<User>>> {
		const users = await this.userService.getUsers()

		return ResponseEntity.of({
			headers: { "X-Test": "test" },
			body: users
		})
	}

	@Post("/users")
	public async createUser(@Body() body: User): Promise<ResponseEntity<User>> {
		try {
			const user = await this.userService.createUser(body)
			return ResponseEntity.of({
				headers: { "X-Test": "test" },
				body: user
			})
		} catch (e) {
			if (e instanceof NotNullConstraintViolationException) {
				return ResponseEntity.of({
					status: HttpStatus.BAD_REQUEST,
					headers: { Error: `${e.name}` }
				})
			}

			return ResponseEntity.of({
				status: HttpStatus.BAD_REQUEST,
				headers: { Error: `${e.name}` }
			})
		}
	}
}
