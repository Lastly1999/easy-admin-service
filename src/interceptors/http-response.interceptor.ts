import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from "@nestjs/common"
import { map, Observable } from "rxjs"

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const result = { statusCode: 200, data, message: "ok" }
                Logger.log(JSON.stringify(result), "HttpResponseInterceptor")
                return result
            })
        )
    }
}
