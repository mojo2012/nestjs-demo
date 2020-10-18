import { AbstractUniqueIdentifierEntity } from "@app/entities"
import { User } from "@app/entities/User"
import { Cascade, Collection, Entity, OneToMany } from "@mikro-orm/core"

@Entity()
export class UserGroup extends AbstractUniqueIdentifierEntity {
	@OneToMany({
		entity: () => User,
		mappedBy: (user: User) => user.group,
		cascade: [Cascade.ALL],
		lazy: true
	})
	public users = new Collection<User>(this)

	public constructor() {
		super()
	}
}
