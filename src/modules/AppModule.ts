import ormConfig from "@app/config/orm.config"
import { MikroORM } from "@mikro-orm/core"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

@Module(ormConfig)
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
			const generator = this.orm.getSchemaGenerator()

			await generator.dropSchema()
			await generator.createSchema()
			await generator.updateSchema()
		}
	}
}
