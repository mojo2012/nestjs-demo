import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable()
export class LoggingInterceptor implements NestInterceptor<unknown, unknown> {
	private loggers = new Map<string, Logger>()

	public intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
		const logger = this.getLogger(context.getClass().name)
		const handlerMethodName = context.getHandler().name

		logger.log(`> ${handlerMethodName}`)

		const now = Date.now()
		return next
			.handle()
			.pipe(
				tap(() => logger.log(`< ${handlerMethodName} (${Date.now() - now}ms)`)),
			)
	}

	private getLogger(typeName: string): Logger {
		let logger = this.loggers.get(typeName)

		if (!logger) {
			logger = new Logger(typeName)
			this.loggers.set(typeName, logger)
		}

		return logger
	}
}
