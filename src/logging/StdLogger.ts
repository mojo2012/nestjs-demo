import { LoggerService } from "@nestjs/common"

export class StdLogger implements LoggerService {
	protected context?: string

	public log(message: string): void {
		/* your implementation */
	}

	public error(message: string, trace: string): void {
		/* your implementation */
	}

	public warn(message: string): void {
		/* your implementation */
	}

	public debug(message: string): void {
		/* your implementation */
	}

	public verbose(message: string): void {
		/* your implementation */
	}
}
