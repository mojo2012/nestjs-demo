import { EntityController } from "@app/endpoints"
import { AppService } from "@app/services"
import { Test, TestingModule } from "@nestjs/testing"

describe("EntityController", () => {
	let entityController: EntityController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [EntityController],
			providers: [AppService]
		}).compile()

		entityController = app.get<EntityController>(EntityController)
	})

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(entityController.getHome()).toBe("Hello World!")
		})
	})
})
