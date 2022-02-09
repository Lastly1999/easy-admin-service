import { IsNumber } from "class-validator"

export class LoginAuthDto {
    @IsNumber()
    age: number
}
