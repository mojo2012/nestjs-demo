import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { ResponseEntity } from "src/dtos/ResponseEntity"

@Injectable()
export class ResponseEntityInterceptor implements NestInterceptor<ResponseEntity<unknown>, unknown> {

	public intercept(context: ExecutionContext, next: CallHandler<ResponseEntity<unknown>>): Observable<ResponseEntity<unknown>> {
		return next
			.handle()
			.pipe(
				map((responseEntity: ResponseEntity<unknown>) => this.process(context, responseEntity) )
			)
	}

	private process(context: ExecutionContext, responseEntity: ResponseEntity<unknown>): any {
		if (responseEntity instanceof ResponseEntity) {
			const http = context.switchToHttp()
			const response = http.getResponse()

			if (responseEntity.status) {
				response.status(responseEntity.status)
			}

			for (const [key, value] of responseEntity.headers) {
				response.res.setHeader(key, value)
			}

			if (responseEntity.body) {
				return responseEntity.body
			}

			return null
		} else {
			return responseEntity
		}
	}
}
