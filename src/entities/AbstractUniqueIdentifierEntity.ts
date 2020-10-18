import { AbstractBaseEntity } from "@app/entities"
import { Property } from "@mikro-orm/core"

export abstract class AbstractUniqueIdentifierEntity extends AbstractBaseEntity {
	@Property({ columnType: "varchar(50)", unique: true, nullable: false })
	public uid!: string

	public constructor() {
		super()
	}
}
