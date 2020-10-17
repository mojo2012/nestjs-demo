import { MikroORM } from "@mikro-orm/core"
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

@Injectable()
export class EntityManagerInterceptor implements NestInterceptor<unknown, unknown> {
	public constructor(private readonly orm: MikroORM) {}

	public intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
		// reset ORM context
		this.orm.em.fork(true, true)

		return next //
			.handle()
	}
}
