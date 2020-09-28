export class ResponseEntity<T> {
	readonly status: number = 200
	readonly headers: Map<string, string>
	readonly body?: T

	private constructor(status = 200, headers = new Map<string, string>(), body?: T) {
		this.status = status
		this.headers = headers
		this.body = body
	}

	/**
	 * Creates a new ResponseEntity object that specifies how the response is rendered
	 * @param args
	 */
	static of<T>(args: { status?: number, headers?: Map<string, string>, body?: T}): ResponseEntity<T> {
		return new ResponseEntity(args.status, args.headers, args.body)
	}
}
