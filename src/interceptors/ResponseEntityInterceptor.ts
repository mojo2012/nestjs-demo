import { ResponseEntity } from "@app/dtos"
import { HttpResponse } from "@app/types"
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable()
export class ResponseEntityInterceptor implements NestInterceptor<ResponseEntity<unknown>, unknown> {
	public intercept(context: ExecutionContext, next: CallHandler<ResponseEntity<unknown>>): Observable<unknown> {
		return next //
			.handle() //
			.pipe(map((responseEntity: ResponseEntity<unknown>) => this.process(context, responseEntity)))
	}

	private process(context: ExecutionContext, responseEntity: ResponseEntity<unknown>): unknown {
		if (responseEntity instanceof ResponseEntity) {
			const http = context.switchToHttp()
			const response: HttpResponse = HttpResponse.of(http.getResponse())

			if (responseEntity.status) {
				response.setStatus(responseEntity.status)
			}

			for (const key in responseEntity.headers) {
				response.setHeader(key, responseEntity.headers[key])
			}

			return responseEntity.body
		} else {
			return responseEntity
		}
	}
}
