import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common"
import { Response, Request } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const errBody = {
            message: exception.message,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        }
        Logger.error(JSON.stringify(errBody), "ExceptionFilter")
        response.status(status).json(errBody)
    }
}
