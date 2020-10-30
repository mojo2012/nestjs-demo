import { EntityController } from "@app/endpoints"
import { AbstractUniqueIdentifierEntity } from "@app/entities"
import { AbstractBaseEntity } from "@app/entities/AbstractBaseEntity"
import { User } from "@app/entities/User"
import { ExceptionFilter } from "@app/filters/ExceptionFilter"
import { LoggingInterceptor, ResponseEntityInterceptor } from "@app/interceptors"
import { UserGroupRepository } from "@app/repositories"
import { UserRepository } from "@app/repositories/UserRepository"
import { EntityService } from "@app/services"
import { MikroORM } from "@mikro-orm/core"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core"
import { UserGroup } from "../entities/UserGroup"

@Module({
	imports: [
		MikroOrmModule.forRoot({
			entities: [AbstractBaseEntity, AbstractUniqueIdentifierEntity, UserGroup, User],
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
	controllers: [EntityController],
	providers: [
		EntityService,
		UserRepository,
		UserGroupRepository,
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor
		},
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: EntityManagerInterceptor
		// },
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseEntityInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: ExceptionFilter
		}
	],
	exports: [MikroOrmModule]
})
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
