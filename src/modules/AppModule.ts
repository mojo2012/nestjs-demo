import { AppController } from "@app/endpoints"
import { AbstractBaseEntity } from "@app/entities/AbstractBaseEntity"
import { User } from "@app/entities/User"
import { UserRepository } from "@app/repositories/UserRepository"
import { UserService } from "@app/services"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { Module } from "@nestjs/common"
import { MikroORM } from "mikro-orm"

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
			password: "change123",
			autoLoadEntities: true
		})
	],
	controllers: [AppController],
	providers: [UserService, UserRepository]
})
export class AppModule {
	public constructor(private readonly orm: MikroORM) {}

	public async onModuleInit(): Promise<void> {
		const commandLineArgs = process.argv.slice(2)

		if (commandLineArgs.includes("--init")) {
			const generator = this.orm.getSchemaGenerator()

			await generator.dropSchema()
			await generator.createSchema()
			await generator.updateSchema()

			// await this.orm.close(true)
		}
	}
}
