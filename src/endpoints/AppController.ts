import { Controller, Get } from "@nestjs/common"
import { ResponseEntity } from "src/dtos/ResponseEntity"
import AppService from "src/services/AppService"

@Controller()
export default class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	async getHello(): Promise<ResponseEntity<string>> {
		const data = await this.appService.getHello()

		return ResponseEntity.of({ status: 200, headers: new Map([[ "X-Test", "test"] ]), body: data })
	}
}
