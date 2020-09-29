export class ResponseEntity<T> {
	public readonly status: number = 200
	public readonly headers: Map<string, string>
	public readonly body?: T

	private constructor(status = 200, headers = new Map<string, string>(), body?: T) {
		this.status = status
		this.headers = headers
		this.body = body
	}

	/**
	 * Creates a new ResponseEntity object that specifies how the response is rendered
	 * @param args
	 */
	public static of<T>(args: ResponseEntityArgs<T>): ResponseEntity<T> {
		return new ResponseEntity(args.status, args.headers, args.body)
	}
}

export interface ResponseEntityArgs<T>{
	status?: number
	headers?: Map<string, string>;
	body?: T;
}
