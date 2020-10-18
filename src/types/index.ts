export interface IRawResponse {
	/**
	 * Adds an HTTP header
	 *
	 * @param key the HTTP header name
	 * @param value the value of the HTTP header
	 */
	setHeader(key: string, value: string): void
}

/**
 * Wraps Express and Fastify response handling
 */
export class HttpResponse {
	/**
	 * The raw HTTP response stream object
	 */
	private rawResponse: any

	private constructor(rawResponse: any) {
		this.rawResponse = rawResponse
	}

	public setHeader(header: string, value: string): void {
		if (this.rawResponse.setHeader) {
			// express
			this.rawResponse.setHeader(header, value)
		} else if (this.rawResponse.raw && this.rawResponse.raw.setHeader) {
			// fastify
			this.rawResponse.raw.setHeader(header, value)
		} else {
			throw new Error("Cannot set header: unknown response implementation")
		}
	}

	public setBody(body: unknown): void {
		if (this.rawResponse.raw.json) {
			// express
			this.rawResponse.raw.json(body)
		} else if (this.rawResponse.send) {
			// fastify
			this.rawResponse.send(body)
		}
	}

	/**
	 * Sets the HTTP status code
	 * @param status the HTTP status code
	 */
	public setStatus(status: number): void {
		if (this.rawResponse.status) {
			this.rawResponse.status(status)
		} else {
			throw new Error("Cannot set status: unknown response implementation")
		}
	}

	public static of(rawResponse: any): HttpResponse {
		return new HttpResponse(rawResponse)
	}
}

export * from "./FreezableObject"
