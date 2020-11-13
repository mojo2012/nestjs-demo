import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { AppModule } from "./modules"

export const BOOTSTRAP_LOGGER = new Logger("Bootstrap")

async function bootstrap() {
	const port = 3000
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
	// app.useGlobalInterceptors(new LoggingInterceptor())
	// app.useGlobalInterceptors(new ResponseEntityInterceptor())
	// app.useGlobalInterceptors(new EntityManagerInterceptor())
	// app.useGlobalFilters(new ExceptionFilter())

	await app.listen(port)

	BOOTSTRAP_LOGGER.log(`Listening on port ${port}`)

	// installs an 'unhandledRejection' handler
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const makePromisesSafe = require("make-promises-safe")
	// installs an 'unhandledRejection' handler
	makePromisesSafe.logError = function(err: Error) {
		BOOTSTRAP_LOGGER.error(err.message)
	}
}

bootstrap()
