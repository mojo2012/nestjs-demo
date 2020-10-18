import { HttpResponse } from "@app/types"
import { MikroORM } from "@mikro-orm/core"
import { ArgumentsHost, Catch, ExceptionFilter as BaseExceptionFilter, HttpException, HttpStatus } from "@nestjs/common"

@Catch()
export class ExceptionFilter implements BaseExceptionFilter<Error> {
	public constructor(private readonly orm: MikroORM) {}

	public catch(exception: Error, context: ArgumentsHost): void {
		// it seems that the entity manager is not cleaned properly when an exception occurs (eg a unique constraint exception)
		// so we clean it up manually
		this.orm.em.clear()

		const http = context.switchToHttp()
		const request = http.getRequest()
		const response: HttpResponse = HttpResponse.of(http.getResponse())

		const message = exception.message
		let status = HttpStatus.INTERNAL_SERVER_ERROR

		if (exception instanceof HttpException && exception.getStatus()) {
			status = exception.getStatus()
		}

		response.setStatus(status)

		response.setBody({
			httpStatus: status,
			error: {
				key: exception.name,
				message: message
			},
			path: request.url
		})
	}
}
