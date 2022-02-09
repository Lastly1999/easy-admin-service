import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./modules/auth/auth.module"
import { UserModule } from "./modules/user/user.module"
import { RoleModule } from "./modules/role/role.module"
import { BaseModule } from "./modules/base/base.module"

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, UserModule, RoleModule, BaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
