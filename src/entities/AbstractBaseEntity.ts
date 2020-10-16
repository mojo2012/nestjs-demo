import { BaseEntity, PrimaryKey, Property } from "mikro-orm"
import { v4 } from "uuid"

export abstract class AbstractBaseEntity extends BaseEntity<AbstractBaseEntity, "id"> {
	@PrimaryKey({ columnType: "uuid" })
	public id = v4()

	@Property({ columnType: "timestamp" })
	public createdAt = new Date()

	@Property({ columnType: "timestamp", onUpdate: () => new Date() })
	public updatedAt = new Date()

	public constructor() {
		super()
	}
}
