import { AbstractUniqueIdentifierEntity } from "@app/entities"
import { UserGroup } from "@app/entities/UserGroup"
import { Entity, ManyToOne } from "@mikro-orm/core"

@Entity()
export class User extends AbstractUniqueIdentifierEntity {
	@ManyToOne({ nullable: true })
	public group!: UserGroup

	public constructor() {
		super()
	}
}
