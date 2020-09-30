export abstract class FreezableObject {

	/**
	 * Freezes an object so that its properties cannot be mutated any more.
	 * Any atempt to muate the object will result in result in an error
	 */
	public freeze(): void {
		Object.freeze(this)
	}

	/**
	 * Returns true if the object has been frozen.
	 */
	public get isFrozen(): boolean {
		return Object.isFrozen(this)
	}
}
