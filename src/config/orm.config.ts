import { EntityController } from "@app/endpoints"
import { AbstractBaseEntity, AbstractUniqueIdentifierEntity, User, UserGroup } from "@app/entities"
import { ExceptionFilter } from "@app/filters/ExceptionFilter"
import { LoggingInterceptor, ResponseEntityInterceptor } from "@app/interceptors"
import { UserGroupRepository, UserRepository } from "@app/repositories"
import { EntityService } from "@app/services"
import { logger, MikroOrmModule } from "@mikro-orm/nestjs"
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core"

export default {
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
			autoLoadEntities: true,
			logger: logger.log.bind(logger)
			// highlighter: new SqlHighlighter(),
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
}
