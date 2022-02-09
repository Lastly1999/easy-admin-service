import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"

@Injectable()
export class ValidationPipePipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToInstance(metatype, value)
        const errors = await validate(object)
        if (errors.length > 0) {
            const msg = Object.values(errors[0].constraints)[0] // 取第一个错误信息并返回
            throw new BadRequestException(`Validation failed:${msg}`)
        }
        return value
    }

    private toValidate(metatype: any): boolean {
        const types: any[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
