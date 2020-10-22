export function Sealable() {
	return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			public seal() {
				Object.freeze(constructor)
			}
		}
	}
}
