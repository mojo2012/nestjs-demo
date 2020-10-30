import { Deprecated } from "@app/decorators/Deprecated"
import { MikroORM, RequestContext } from "@mikro-orm/core"
import { Injectable, NestMiddleware } from "@nestjs/common"

@Injectable()
@Deprecated()
/** @deprecated */
export class EntityManagerMiddleware implements NestMiddleware {
	public constructor(private readonly orm: MikroORM) {}

	public use(req: Request, res: Response, next: () => void): void {
		RequestContext.create(this.orm.em, next)
	}
}
