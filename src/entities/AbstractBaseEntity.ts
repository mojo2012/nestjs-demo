import { UUID } from "@app/types"
import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 as createUUID } from "uuid"

export abstract class AbstractBaseEntity extends BaseEntity<AbstractBaseEntity, "id"> {
	@PrimaryKey({ columnType: "uuid" })
	public id: UUID = createUUID()

	@Property({ version: true, columnType: "integer" })
	public version = 0

	@Property({ columnType: "timestamp" })
	public createdAt = new Date()

	@Property({ columnType: "timestamp", onUpdate: () => new Date() })
	public updatedAt = new Date()

	public constructor() {
		super()
	}
}
