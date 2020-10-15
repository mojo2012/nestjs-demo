import { AbstractBaseEntity } from "@app/entities/AbstractBaseEntity"
import { Entity, Property } from "mikro-orm"

@Entity()
export class User extends AbstractBaseEntity {
	@Property({ columnType: "varchar(50)", unique: true })
	public uid!: string
}
