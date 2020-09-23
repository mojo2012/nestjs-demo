
export interface ResponseEntity<T> {
	data: T
}

export function of<T>(data: T): ResponseEntity<T> {
	return {
		data: data
	};
}