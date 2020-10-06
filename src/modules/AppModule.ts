import { AppController } from "@app/endpoints"
import { AppService } from "@app/services"
import { Module } from "@nestjs/common"

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
