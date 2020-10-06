export interface IRawResponse {
	/**
	 * Adds an HTTP header
	 *
	 * @param key the HTTP header name
	 * @param value the value of the HTTP header
	 */
	setHeader(key: string, value: string): void
}

export interface IResponse {
	/**
	 * The raw HTTP response stream object
	 */
	raw?: IRawResponse

	/**
	 * Sets the HTTP status code
	 * @param status the HTTP status code
	 */
	status?(status: number): void
}

export class HttpResponse implements IResponse {
	public setHeader(header: string, value: string): void {
		//
	}
}

export * from "./FreezableObject"
