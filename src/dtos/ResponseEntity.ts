export class ResponseEntity<T> {
	readonly data: T

	private constructor(data: T) {
		this.data = data
	}

	static of<T>(data: T): ResponseEntity<T> {
		return new ResponseEntity(data)
	}
}
