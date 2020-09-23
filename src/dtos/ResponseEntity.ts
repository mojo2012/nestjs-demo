
export class ResponseEntity<T> {
	private data: T;

	private constructor(data: T) {
		this.data = data;
	}

	static of<T>(data: T): ResponseEntity<T> {
		return new ResponseEntity(data);
	}
}
