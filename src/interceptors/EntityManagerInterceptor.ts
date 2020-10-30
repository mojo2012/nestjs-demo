import { Deprecated } from "@app/decorators/Deprecated"
import { MikroORM } from "@mikro-orm/core"
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable } from "rxjs"

/**
 * In some setups MikroORM throws some errors on repeated entity manager calls. A quick-fix is to fork a new entity manger on each request.
 */
@Injectable()
@Deprecated()
export class EntityManagerInterceptor implements NestInterceptor<unknown, unknown> {
	public constructor(private readonly orm: MikroORM) {}

	public async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
		// reset ORM context
		await this.orm.em.flush()
		this.orm.em.clear()

		return next //
			.handle()
	}
}
