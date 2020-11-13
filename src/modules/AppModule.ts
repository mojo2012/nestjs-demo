import NestConfig from "@app/config/NestConfig"
import { BOOTSTRAP_LOGGER } from "@app/main"
import { MikroORM } from "@mikro-orm/core"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

@Module(NestConfig)
export class AppModule implements NestModule {
	public constructor(private readonly orm: MikroORM) {}

	public configure(consumer: MiddlewareConsumer): void {
		// consumer //
		// 	.apply(EntityManagerMiddleware)
		// 	.forRoutes("*")
	}

	public async onModuleInit(): Promise<void> {
		const commandLineArgs = process.argv.slice(2)

		if (commandLineArgs.includes("--init")) {
			try {
				const generator = this.orm.getSchemaGenerator()

				await generator.dropSchema()
				await generator.createSchema()
				await generator.updateSchema()
			} catch (error) {
				BOOTSTRAP_LOGGER.warn("Schema generator not available!")
			}
		}
	}
}
