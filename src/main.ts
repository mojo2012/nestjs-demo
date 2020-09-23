import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { AppModule } from "./modules/AppModule"

async function bootstrap() {
	const port = 3000
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
	await app.listen(port)

	new Logger("Bootstrap").log(`Listening on port ${port}`)
}

bootstrap()
