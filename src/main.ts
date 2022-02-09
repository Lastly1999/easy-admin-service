import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { HttpExceptionFilter } from "./filters/http-exception.filter"
import { ValidationPipePipe } from "./pipes/validation-pipe.pipe"
import { HttpResponseInterceptor } from "./interceptors/http-response.interceptor"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // http exception filter
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipePipe())
    app.useGlobalInterceptors(new HttpResponseInterceptor())
    const configService = app.get(ConfigService)
    app.setGlobalPrefix(configService.get<string>("API_VERSION"))
    await app.listen(configService.get<string>("SERVICE_PORT"))
}
bootstrap()
