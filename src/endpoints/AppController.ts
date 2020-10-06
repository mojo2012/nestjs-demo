import { ResponseEntity } from "@app/dtos"
import { AppService } from "@app/services/AppService"
import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
	public constructor(private readonly appService: AppService) {}

	@Get()
	public async getHome(): Promise<ResponseEntity<string>> {
		const data = await this.appService.getHello()

		return ResponseEntity.of({
			headers: { "X-Test": "test" },
			body: data
		})
	}
}
