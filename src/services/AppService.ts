import { Injectable } from "@nestjs/common"

@Injectable()
export default class AppService {
	public async getHello(): Promise<string> {
		return "Hello World!"
	}
}
