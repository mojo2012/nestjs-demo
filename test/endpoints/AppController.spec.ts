import { AppController } from "@app/endpoints"
import { AppService } from "@app/services"
import { Test, TestingModule } from "@nestjs/testing"

describe("AppController", () => {
	let appController: AppController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		appController = app.get<AppController>(AppController)
	})

	describe("root", () => {
		it("should return \"Hello World!\"", () => {
			expect(appController.getHome()).toBe("Hello World!")
		})
	})
})
