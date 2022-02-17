import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

export type JwtTokenParams = {
    userName: string
    id: string
    roleId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: configService.get<string>("JWT_SECRET"),
        })
    }

    validate(payload: JwtTokenParams): JwtTokenParams {
        return { userName: payload.userName, id: payload.id, roleId: payload.roleId }
    }
}
