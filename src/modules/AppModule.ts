import { AppController } from "@app/endpoints"
import { AbstractBaseEntity } from "@app/entities/AbstractBaseEntity"
import { User } from "@app/entities/User"
import { UserRepository } from "@app/repositories/UserRepository"
import { AppService } from "@app/services"
import { Module } from "@nestjs/common"
import { MikroORM } from "mikro-orm"
import { MikroOrmModule } from "nestjs-mikro-orm"

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entities: [AbstractBaseEntity, User],
			dbName: "nest",
			type: "postgresql",
			clientUrl: "jdbc:postgresql://localhost:5432/",
			baseDir: __dirname,
			strict: true,
			user: "admin",
			password: "change123"
		})
	],
	controllers: [AppController],
	providers: [AppService, UserRepository]
})
export class AppModule {
	public constructor(private readonly orm: MikroORM) {}

	public async onModuleInit(): Promise<void> {
		const commandLineArgs = process.argv.slice(2)
		// console.log("commandLineArgs: ", commandLineArgs)

		if (commandLineArgs.includes("--init")) {
			const generator = this.orm.getSchemaGenerator()

			const dropDump = await generator.getDropSchemaSQL()
			const createDump = await generator.getCreateSchemaSQL()
			const updateDump = await generator.getUpdateSchemaSQL()

			// there is also `generate()` method that returns drop + create queries
			const dropAndCreateDump = await generator.generate()

			// or you can run those queries directly, but be sure to check them first!
			await generator.dropSchema()
			await generator.createSchema()
			await generator.updateSchema()

			await this.orm.close(true)
		}
	}
}
