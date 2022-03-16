import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: null,
        }),
    ],
})
export class AuthModule {}
