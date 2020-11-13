import { Constructor } from "@mikro-orm/core"

export function Sealable() {
	return function<T extends { new (...args: any[]): Constructor<T> }>(constructor: T) {
		return class extends constructor {
			public seal() {
				Object.freeze(constructor)
			}
		}
	}
}
