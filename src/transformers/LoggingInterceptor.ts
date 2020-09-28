import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const logger = new Logger(context.getClass().name)
		const handlerMethodName = context.getHandler().name

		context.getClass().name

		logger.log(`> ${handlerMethodName}`)

		const now = Date.now()
		return next
			.handle()
			.pipe(
				tap(() => logger.log(`< ${handlerMethodName} (${Date.now() - now}ms)`)),
			)
	}
}
